import { mkdir, readFile, rm, writeFile, cp, stat } from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import { transform } from 'esbuild';
import { minify } from 'html-minifier-terser';
import { marked } from 'marked';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const supportedLanguages = ['vi', 'en'];
const siteUrl = (process.env.SITE_URL || 'https://yourdomain.com').replace(/\/$/, '');
const basePath = (process.env.BASE_PATH || '').replace(/\/$/, ''); // e.g. '/shrimp_blog' for GitHub Pages subdir, '' for root
const homeSeo = {
  vi: {
    title: 'Color Aquatic - Hướng dẫn nuôi và chăm sóc tép cảnh',
    description: 'Blog chia sẻ kiến thức về nuôi tép cảnh, các loại tép phổ biến, cách chăm sóc, setup bể và kinh nghiệm thực tế từ người chơi tép lâu năm.',
    keywords: 'tép cảnh, tép thủy sinh, nuôi tép, chăm sóc tép, tép cherry, tép crystal, tép amano'
  },
  en: {
    title: 'Color Aquatic - Aquarium Shrimp Care Guide',
    description: 'Blog sharing knowledge about aquarium shrimp, common shrimp species, care methods, tank setup and practical experience from long-time shrimp keepers.',
    keywords: 'aquarium shrimp, shrimp keeping, shrimp care, cherry shrimp, crystal shrimp, aquascape shrimp'
  }
};

function toIsoDate(value) {
  return value.toISOString().slice(0, 10);
}

function stripMarkdown(text) {
  return text
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[\*_`>#\-|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitleFromMarkdown(markdown, fallback) {
  const lines = markdown.split(/\r?\n/);
  const headingLine = lines.find((line) => /^#\s+/.test(line.trim()));
  if (headingLine) {
    return headingLine.replace(/^#\s+/, '').trim();
  }
  return fallback;
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceRequired(source, pattern, replacement, label) {
  const matched = typeof pattern === 'string' ? source.includes(pattern) : pattern.test(source);
  if (!matched) {
    throw new Error(`Could not update template segment: ${label}`);
  }
  const result = source.replace(pattern, replacement);
  return result;
}

function extractDescriptionFromMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  for (const line of lines) {
    const candidate = line.trim();
    if (!candidate || candidate.startsWith('#')) {
      continue;
    }
    const text = stripMarkdown(candidate);
    if (text.length > 0) {
      return text.slice(0, 180);
    }
  }
  return '';
}

function normalizeTemplateAssets(template) {
  return template
    .replace(/href="favicon\.ico"/g, `href="${basePath}/favicon.ico"`)
    .replace(/href="css\//g, `href="${basePath}/css/`)
    .replace(/src="js\//g, `src="${basePath}/js/`)
    .replace(/src="images\//g, `src="${basePath}/images/`)
    .replace(/srcset="images\//g, `srcset="${basePath}/images/`);
}

function injectBasePath(html) {
  return html.replace('</head>', `<script>window.__BASE_PATH__=${JSON.stringify(basePath)};</script>\n</head>`);
}

function setHeadMetadata(template, { lang, title, description, keywords, canonicalPath, alternateVi, alternateEn, ogType = 'website' }) {
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const safeTitle = escapeAttr(title);
  const safeDescription = escapeAttr(description);
  const safeKeywords = escapeAttr(keywords || '');

  let html = template;
  html = replaceRequired(html, /<html lang="[^"]+">/, `<html lang="${lang}">`, 'html lang');
  html = replaceRequired(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, 'title');
  html = replaceRequired(html, /<meta name="description" content="[^"]*">/, `<meta name="description" content="${safeDescription}">`, 'meta description');
  html = replaceRequired(html, /<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="${safeKeywords}">`, 'meta keywords');
  html = replaceRequired(html, /<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="${ogType}">`, 'og type');
  html = replaceRequired(html, /<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonicalUrl}">`, 'og url');
  html = replaceRequired(html, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${safeTitle}">`, 'og title');
  html = replaceRequired(html, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${safeDescription}">`, 'og description');
  html = replaceRequired(html, /<meta property="twitter:url" content="[^"]*">/, `<meta property="twitter:url" content="${canonicalUrl}">`, 'twitter url');
  html = replaceRequired(html, /<meta property="twitter:title" content="[^"]*">/, `<meta property="twitter:title" content="${safeTitle}">`, 'twitter title');
  html = replaceRequired(html, /<meta property="twitter:description" content="[^"]*">/, `<meta property="twitter:description" content="${safeDescription}">`, 'twitter description');
  html = replaceRequired(
    html,
    /<link rel="canonical" href="[^"]*">/,
    [
      `<link rel="canonical" href="${canonicalUrl}">`,
      `<link rel="alternate" hreflang="vi" href="${siteUrl}${alternateVi}">`,
      `<link rel="alternate" hreflang="en" href="${siteUrl}${alternateEn}">`,
      `<link rel="alternate" hreflang="x-default" href="${siteUrl}/vi/">`
    ].join('\n    '),
    'canonical and alternates'
  );
  return html;
}

function setBodyData(template, attributes) {
  const attributeString = Object.entries(attributes)
    .map(([key, value]) => `${key}="${escapeAttr(value)}"`)
    .join(' ');
  return replaceRequired(template, /<body>/, `<body ${attributeString}>`, 'body attributes');
}

function setNavigationLinks(template, lang) {
  const homePath = `${basePath}/${lang}/`;
  let html = template;
  html = replaceRequired(html, /href="index\.html" data-translate="nav\.home"/, `href="${homePath}" data-translate="nav.home"`, 'home nav link');
  html = replaceRequired(html, /href="#collection" data-translate="nav\.collection"/, `href="${homePath}#collection" data-translate="nav.collection"`, 'collection nav link');
  html = replaceRequired(html, /href="#posts" data-translate="nav\.posts"/, `href="${homePath}#posts" data-translate="nav.posts"`, 'posts nav link');
  html = replaceRequired(html, /href="#about" data-translate="nav\.about"/, `href="${homePath}#about" data-translate="nav.about"`, 'about nav link');
  html = replaceRequired(html, /href="index\.html" role="button" class="secondary" data-translate="post\.backButton"/, `href="${homePath}" role="button" class="secondary" data-translate="post.backButton"`, 'back button link');
  return html;
}

function setLanguageSwitcher(template, { lang, switchVi, switchEn }) {
  const summaryMarkup = lang === 'en'
    ? `<summary id="language-summary" class="language-summary">\n                            <span class="lang-flag flag-gb"></span>\n                            <span class="lang-text">English</span>\n                        </summary>`
    : `<summary id="language-summary" class="language-summary">\n                            <span class="lang-flag flag-vn"></span>\n                            <span class="lang-text">Tiếng Việt</span>\n                        </summary>`;

  let html = template;
  html = replaceRequired(html, /<summary id="language-summary" class="language-summary">[\s\S]*?<\/summary>/, summaryMarkup, 'language summary');
  html = replaceRequired(html, /<a href="#" class="lang-option" data-lang="vi">/, `<a href="${switchVi}" class="lang-option" data-lang="vi">`, 'vi switch link');
  html = replaceRequired(html, /<a href="#" class="lang-option" data-lang="en">/, `<a href="${switchEn}" class="lang-option" data-lang="en">`, 'en switch link');
  return html;
}

function hideSection(template, sectionId) {
  return replaceRequired(
    template,
    new RegExp(`<section id="${sectionId}"([^>]*)>`, 'm'),
    `<section id="${sectionId}"$1 style="display:none" aria-hidden="true">`,
    `hide section ${sectionId}`
  );
}

function buildDetailContent({ title, htmlContent, metaLine }) {
  return [
    '                <header>',
    `                    <h1>${title}</h1>`,
    metaLine ? `                    <p><small>${metaLine}</small></p>` : '',
    '                </header>',
    '                <hr>',
    `                ${htmlContent}`
  ].filter(Boolean).join('\n');
}

function buildDetailPageFromTemplate(template, { lang, title, description, keywords, canonicalPath, htmlContent, alternatePath, metaLine }) {
  const switchVi = lang === 'vi' ? `${basePath}${canonicalPath}` : `${basePath}/vi/`;
  const switchEn = lang === 'en' ? `${basePath}${canonicalPath}` : (alternatePath ? `${basePath}${alternatePath}` : `${basePath}/en/`);
  let html = normalizeTemplateAssets(template);
  html = injectBasePath(html);
  html = setHeadMetadata(html, {
    lang,
    title: `${title} - Color Aquatic`,
    description,
    keywords,
    canonicalPath,
    alternateVi: lang === 'vi' ? canonicalPath : '/vi/',
    alternateEn: lang === 'en' ? canonicalPath : (alternatePath || '/en/'),
    ogType: 'article'
  });
  html = setBodyData(html, {
    'data-static-page-type': 'detail',
    'data-static-lang': lang,
    'data-switch-vi': switchVi,
    'data-switch-en': switchEn
  });
  html = setNavigationLinks(html, lang);
  html = setLanguageSwitcher(html, { lang, switchVi, switchEn });
  html = hideSection(html, 'search-section');
  html = hideSection(html, 'hero');
  html = hideSection(html, 'benefits');
  html = hideSection(html, 'collection');
  html = hideSection(html, 'posts');
  html = replaceRequired(html, /<section id="post-content" class="[^"]*is-hidden[^"]*">/, '<section id="post-content">', 'show post content section');
  html = replaceRequired(html, '<!-- Markdown content will be rendered here -->', buildDetailContent({ title, htmlContent, metaLine }), 'detail article content');
  return html;
}

function buildHomePageFromTemplate(template, lang) {
  const seo = homeSeo[lang];
  const pagePath = `/${lang}/`;      // pure path for canonical/hreflang (combined with siteUrl)
  const switchVi = `${basePath}/vi/`; // full browser path for navigation
  const switchEn = `${basePath}/en/`;
  let html = normalizeTemplateAssets(template);
  html = injectBasePath(html);
  html = setHeadMetadata(html, {
    lang,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    canonicalPath: pagePath,
    alternateVi: '/vi/',
    alternateEn: '/en/',
    ogType: 'website'
  });
  html = setBodyData(html, {
    'data-static-page-type': 'home',
    'data-static-lang': lang,
    'data-switch-vi': switchVi,
    'data-switch-en': switchEn
  });
  html = setNavigationLinks(html, lang);
  html = setLanguageSwitcher(html, { lang, switchVi, switchEn });
  return html;
}

async function minifyHtml(html) {
  return minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    keepClosingSlash: true
  });
}

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function writeMinifiedJs(srcPath, destPath) {
  const code = await readFile(srcPath, 'utf8');
  const result = await transform(code, {
    loader: 'js',
    minify: true,
    target: 'es2018'
  });
  await ensureDir(path.dirname(destPath));
  await writeFile(destPath, result.code, 'utf8');
}

async function writeMinifiedCss(srcPath, destPath) {
  const code = await readFile(srcPath, 'utf8');
  const result = await transform(code, {
    loader: 'css',
    minify: true,
    target: 'es2018'
  });
  await ensureDir(path.dirname(destPath));
  await writeFile(destPath, result.code, 'utf8');
}

async function buildRootRedirect() {
  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=${basePath}/vi/">
  <title>Redirecting...</title>
  <link rel="canonical" href="${siteUrl}/vi/">
</head>
<body>
  <p>Redirecting to <a href="${basePath}/vi/">${basePath}/vi/</a></p>
</body>
</html>`;
  await writeFile(path.join(distDir, 'index.html'), await minifyHtml(html), 'utf8');
}

async function buildStaticMarkdownPages(indexTemplate) {
  const generatedPages = [];

  for (const lang of supportedLanguages) {
    const homeOutputPath = path.join(distDir, lang, 'index.html');
    await ensureDir(path.dirname(homeOutputPath));
    await writeFile(homeOutputPath, await minifyHtml(buildHomePageFromTemplate(indexTemplate, lang)), 'utf8');

    generatedPages.push({
      lang,
      type: 'home',
      title: `Home ${lang}`,
      urlPath: `/${lang}/`,
      lastmod: toIsoDate(new Date())
    });

    const postFiles = await glob(`posts/${lang}/*.md`, { cwd: rootDir, nodir: true });
    for (const relFile of postFiles) {
      const markdownPath = path.join(rootDir, relFile);
      const markdown = await readFile(markdownPath, 'utf8');
      const id = path.basename(relFile, '.md');
      const title = extractTitleFromMarkdown(markdown, id);
      const description = extractDescriptionFromMarkdown(markdown);
      const htmlContent = marked.parse(markdown);
      const urlPath = `/${lang}/posts/${id}/`;
      const outputPath = path.join(distDir, lang, 'posts', id, 'index.html');
      const fileStat = await stat(markdownPath);
      const alternateLang = lang === 'vi' ? 'en' : 'vi';
      const alternateSource = path.join(rootDir, 'posts', alternateLang, `${id}.md`);
      const alternateExists = await stat(alternateSource).then(() => true).catch(() => false);
      const alternatePath = alternateExists ? `/${alternateLang}/posts/${id}/` : '';
      const metaLine = lang === 'en'
        ? `Published on ${new Date(fileStat.mtime).toLocaleDateString('en-US')}`
        : `Cập nhật ${new Date(fileStat.mtime).toLocaleDateString('vi-VN')}`;

      const pageHtml = buildDetailPageFromTemplate(indexTemplate, {
        lang,
        title,
        description,
        keywords: '',
        canonicalPath: urlPath,
        htmlContent,
        alternatePath,
        metaLine
      });

      await ensureDir(path.dirname(outputPath));
      await writeFile(outputPath, await minifyHtml(pageHtml), 'utf8');

      generatedPages.push({
        lang,
        type: 'post',
        title,
        urlPath,
        lastmod: toIsoDate(fileStat.mtime)
      });
    }

    const collectionFiles = await glob(`collection/*/${lang}/*.md`, { cwd: rootDir, nodir: true });
    for (const relFile of collectionFiles) {
      const markdownPath = path.join(rootDir, relFile);
      const markdown = await readFile(markdownPath, 'utf8');
      const id = path.basename(relFile, '.md');
      const title = extractTitleFromMarkdown(markdown, id);
      const description = extractDescriptionFromMarkdown(markdown);
      const htmlContent = marked.parse(markdown);
      const normalizedRelFile = relFile.replace(/\\/g, '/');
      const category = normalizedRelFile.split('/')[1];
      const urlPath = `/${lang}/collection/${category}/${id}/`;
      const outputPath = path.join(distDir, lang, 'collection', category, id, 'index.html');
      const fileStat = await stat(markdownPath);
      const alternateLang = lang === 'vi' ? 'en' : 'vi';
      const alternateSource = path.join(rootDir, 'collection', category, alternateLang, `${id}.md`);
      const alternateExists = await stat(alternateSource).then(() => true).catch(() => false);
      const alternatePath = alternateExists ? `/${alternateLang}/collection/${category}/${id}/` : '';

      const pageHtml = buildDetailPageFromTemplate(indexTemplate, {
        lang,
        title,
        description,
        keywords: '',
        canonicalPath: urlPath,
        htmlContent,
        alternatePath,
        metaLine: ''
      });

      await ensureDir(path.dirname(outputPath));
      await writeFile(outputPath, await minifyHtml(pageHtml), 'utf8');

      generatedPages.push({
        lang,
        type: 'collection',
        title,
        urlPath,
        lastmod: toIsoDate(fileStat.mtime)
      });
    }
  }

  return generatedPages;
}

async function buildSitemap(pages) {
  const uniqueUrls = new Map();
  uniqueUrls.set(`${siteUrl}/`, {
    loc: `${siteUrl}/`,
    lastmod: toIsoDate(new Date()),
    priority: '1.0'
  });

  for (const page of pages) {
    const loc = `${siteUrl}${page.urlPath}`;
    if (!uniqueUrls.has(loc)) {
      uniqueUrls.set(loc, {
        loc,
        lastmod: page.lastmod,
        priority: page.type === 'home' ? '0.9' : '0.8'
      });
    }
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...Array.from(uniqueUrls.values()).map((item) => [
      '  <url>',
      `    <loc>${item.loc}</loc>`,
      `    <lastmod>${item.lastmod}</lastmod>`,
      `    <priority>${item.priority}</priority>`,
      '  </url>'
    ].join('\n')),
    '</urlset>'
  ].join('\n');

  await writeFile(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
}

async function copyStaticDirectories() {
  const toCopy = ['images'];
  for (const dirName of toCopy) {
    await cp(path.join(rootDir, dirName), path.join(distDir, dirName), { recursive: true });
  }
}

async function buildJsAndCss() {
  const jsFiles = await glob('js/**/*.js', { cwd: rootDir, nodir: true });
  const cssFiles = await glob('css/**/*.css', { cwd: rootDir, nodir: true });

  for (const relPath of jsFiles) {
    await writeMinifiedJs(path.join(rootDir, relPath), path.join(distDir, relPath));
  }

  for (const relPath of cssFiles) {
    await writeMinifiedCss(path.join(rootDir, relPath), path.join(distDir, relPath));
  }
}

async function copyRootSupportFiles() {
  const files = ['clear-cache.html'];
  for (const fileName of files) {
    await cp(path.join(rootDir, fileName), path.join(distDir, fileName));
  }
}

async function main() {
  await rm(distDir, { recursive: true, force: true });
  await ensureDir(distDir);

  const indexTemplate = await readFile(path.join(rootDir, 'index.html'), 'utf8');

  await Promise.all([buildJsAndCss(), copyStaticDirectories(), copyRootSupportFiles()]);
  await buildRootRedirect();
  const pages = await buildStaticMarkdownPages(indexTemplate);
  await buildSitemap(pages);

  process.stdout.write(`Build completed: dist/ (${pages.length} static pages + sitemap.xml)\n`);
}

main().catch((error) => {
  process.stderr.write(`Build failed: ${error.message}\n`);
  process.exit(1);
});
