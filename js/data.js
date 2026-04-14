// Data for Color Aquatic Blog
console.log('data.js loaded');

/**
 * Posts data array containing blog articles
 * Each post has multilingual support (Vietnamese/English) with metadata
 */
const posts = [
    {
        id: 'tep-mau',
        titleVi: 'Tép Màu (Neocaridina) - Hướng dẫn nuôi và chăm sóc',
        titleEn: 'Color Shrimp (Neocaridina) - Care and Breeding Guide',
        date: '2024-01-20',
        descriptionVi: 'Tìm hiểu về tép màu (Neocaridina) - nhóm tép cảnh phổ biến nhất với nhiều màu sắc đa dạng như đỏ, vàng, xanh, cam. Hướng dẫn cách nuôi và chăm sóc để chúng phát triển khỏe mạnh.',
        descriptionEn: 'Learn about color shrimp (Neocaridina) - the most popular group of aquarium shrimp with diverse colors like red, yellow, blue, orange. Guide on how to care and breed them for healthy development.',
        keywordsVi: 'tép màu, neocaridina, tép cherry, tép cảnh màu sắc, nuôi tép màu',
        keywordsEn: 'color shrimp, neocaridina, cherry shrimp, colorful aquarium shrimp, keeping color shrimp'
    },
    {
        id: 'tep-lanh',
        titleVi: 'Tép Lạnh - Hướng dẫn nuôi và chăm sóc',
        titleEn: 'Cold Water Shrimp - Care Guide',
        date: '2024-01-18',
        descriptionVi: 'Tìm hiểu về tép lạnh - nhóm tép có thể sống ở nhiệt độ thấp, không cần máy sưởi. Phù hợp với khí hậu mát mẻ và giúp tiết kiệm điện.',
        descriptionEn: 'Learn about cold water shrimp - a group of shrimp that can live at low temperatures without a heater. Suitable for cool climates and helps save electricity.',
        keywordsVi: 'tép lạnh, tép amano, tép ghost, nuôi tép không cần sưởi, tép ôn đới',
        keywordsEn: 'cold water shrimp, amano shrimp, ghost shrimp, shrimp without heater, temperate shrimp'
    },
    {
        id: 'tep-sulawesi',
        titleVi: 'Tép Sulawesi - Hướng dẫn nuôi và chăm sóc',
        titleEn: 'Sulawesi Shrimp - Care Guide',
        date: '2024-01-16',
        descriptionVi: 'Tìm hiểu về tép Sulawesi - nhóm tép quý hiếm và đặc biệt từ Indonesia. Yêu cầu điều kiện nuôi đặc biệt với nhiệt độ cao và pH cao.',
        descriptionEn: 'Learn about Sulawesi shrimp - rare and special shrimp group from Indonesia. Requires special care conditions with high temperature and high pH.',
        keywordsVi: 'tép sulawesi, tép cardinal, tép quý hiếm, nuôi tép sulawesi, caridina dennerli',
        keywordsEn: 'sulawesi shrimp, cardinal shrimp, rare shrimp, keeping sulawesi shrimp, caridina dennerli'
    },
    {
        id: 'setup-be-tep',
        titleVi: 'Hướng dẫn Setup Bể Tép Cảnh Cho Người Mới Bắt Đầu',
        titleEn: 'Aquarium Shrimp Setup Guide for Beginners',
        date: '2024-01-10',
        descriptionVi: 'Hướng dẫn chi tiết cách setup bể tép cảnh từ A-Z, bao gồm lựa chọn thiết bị, setup môi trường nước và các lưu ý quan trọng.',
        descriptionEn: 'Detailed guide on how to setup an aquarium shrimp tank from A-Z, including equipment selection, water environment setup and important notes.',
        keywordsVi: 'setup bể tép, bể tép cảnh, hướng dẫn nuôi tép',
        keywordsEn: 'shrimp tank setup, aquarium shrimp tank, shrimp keeping guide'
    }
];

/**
 * Collection products data array containing shrimp, plants, and accessories
 * Each product has multilingual support and detailed specifications
 */
const collectionProducts = [
    {
        id: 'tep-bluedream',
        category: 'shrimps',
        nameVi: 'Tép Blue Dream',
        nameEn: 'Blue Dream Shrimp',
        shortDescriptionVi: 'Tép cảnh với màu xanh dương tuyệt đẹp, phù hợp cho người chơi lâu năm.',
        shortDescriptionEn: 'Beautiful blue-colored aquarium shrimp, suitable for experienced hobbyists.',
        temperature: '22-26°C',
        tds: '150-250 ppm',
        gh: '6-12 dGH',
        lifespan: '1-2',
        images: ['shrimps/bluedream1.png', 'shrimps/bluedream2.png', 'shrimps/bluedream3.png', 'shrimps/bluedream4.png']
    },
    {
        id: 'tep-pure-red-line',
        category: 'shrimps',
        nameVi: 'Tép Pure Red Line',
        nameEn: 'Pure Red Line Shrimp',
        shortDescriptionVi: 'Tép với đường màu đỏ thuần khiết, màu sắc sống động và bền vững.',
        shortDescriptionEn: 'Shrimp with pure red lines, vibrant and sustainable colors.',
        temperature: '20-28°C',
        tds: '120-200 ppm',
        gh: '4-10 dGH',
        lifespan: '1-2',
        images: ['shrimps/prl1.png', 'shrimps/prl2.png', 'shrimps/prl3.png', 'shrimps/prl4.png']
    },
    {
        id: 'tep-firered',
        category: 'shrimps',
        nameVi: 'Tép Fire Red',
        nameEn: 'Fire Red Shrimp',
        shortDescriptionVi: 'Dòng Neocaridina đỏ đậm, màu phủ đều toàn thân và rất dễ nuôi cho người mới.',
        shortDescriptionEn: 'A deep-red Neocaridina line with strong body coverage, hardy and beginner-friendly.',
        temperature: '18-25°C',
        tds: '150-350 ppm',
        gh: '3-15 dGH',
        lifespan: '1-1.5',
        images: ['shrimps/firered1.png', 'shrimps/firered2.png', 'shrimps/firered3.png', 'shrimps/firered4.png']
    },
    {
        id: 'green-jade',
        category: 'shrimps',
        nameVi: 'Tép Green Jade',
        nameEn: 'Green Jade Shrimp',
        shortDescriptionVi: 'Dòng tép xanh ngọc dễ nuôi, dễ sinh sản và rất phù hợp cho bể thủy sinh của người mới.',
        shortDescriptionEn: 'A jade-green shrimp line that is hardy, breeds easily, and is ideal for beginner planted tanks.',
        temperature: '22-30°C',
        tds: '150-300 ppm',
        gh: '7-9 dGH',
        lifespan: '1-2',
        images: ['shrimps/green1.png', 'shrimps/green1.png', 'shrimps/green1.png', 'shrimps/green1.png']
    },
    {
        id: 'vang-thai',
        category: 'shrimps',
        nameVi: 'Tép Vàng Thái',
        nameEn: 'Thai Yellow Shrimp',
        shortDescriptionVi: 'Dòng tép vàng cam dễ nuôi, dễ sinh sản và rất phù hợp cho người mới chơi tép cảnh.',
        shortDescriptionEn: 'A yellow-orange shrimp line that is hardy, prolific, and ideal for beginner shrimp keepers.',
        temperature: '22-31°C',
        tds: '150-300 ppm',
        gh: '7-9 dGH',
        lifespan: '1-2',
        images: ['shrimps/yellow1.png', 'shrimps/yellow2.png', 'shrimps/yellow3.png', 'shrimps/yellow3.png']
    },
    {
        id: 'orange-eye-red-dragon',
        category: 'shrimps',
        nameVi: 'Tép Orange Eye Red Dragon',
        nameEn: 'Orange Eye Red Dragon Shrimp',
        shortDescriptionVi: 'Dòng tép tiger cao cấp với mắt cam nổi bật và họa tiết đỏ đậm dạng rồng rất ấn tượng.',
        shortDescriptionEn: 'A premium tiger shrimp line with bright orange eyes and striking dragon-like red patterning.',
        temperature: '22-26°C',
        tds: '120-180 ppm',
        gh: '4-6 dGH',
        lifespan: '1.5-2',
        images: ['shrimps/oe1.png', 'shrimps/oe1.png', 'shrimps/oe1.png', 'shrimps/oe1.png']
    },
    {
        id: 'tep-pure-black-line',
        category: 'shrimps',
        nameVi: 'Tép Pure Black Line (Ong Đen)',
        nameEn: 'Pure Black Line Shrimp',
        shortDescriptionVi: 'Dòng tép ong đen trắng thuần gen, hoa văn rõ và ổn định qua nhiều thế hệ.',
        shortDescriptionEn: 'A pure black-and-white bee shrimp line with stable patterns across generations.',
        temperature: '22-26°C',
        tds: '120-180 ppm',
        gh: '4-6 dGH',
        lifespan: '1.5-2',
        images: ['shrimps/pbl1.png', 'shrimps/pbl2.png', 'shrimps/pbl1.png', 'shrimps/pbl2.png']
    },
    {
        id: 'tep-ocean-blue',
        category: 'shrimps',
        nameVi: 'Tép Ocean Blue',
        nameEn: 'Ocean Blue Shrimp',
        shortDescriptionVi: 'Tép xanh biển nổi bật với tông xanh lạnh sâu, phù hợp bể nền tối và bố cục thủy sinh.',
        shortDescriptionEn: 'A striking ocean-toned blue shrimp with cool deep coloration, ideal for dark aquascapes.',
        temperature: '20-24°C',
        tds: '110-170 ppm',
        gh: '4-6 dGH',
        lifespan: '1.5-2',
        images: ['shrimps/ocean1.png', 'shrimps/ocean1.png', 'shrimps/ocean1.png', 'shrimps/ocean1.png']
    },
    {
        id: 'tep-loan-lanh',
        category: 'shrimps',
        nameVi: 'Tép Loạn Lạnh (Thập Cẩm)',
        nameEn: 'Mixed Cold-Water Shrimp',
        shortDescriptionVi: 'Combo tép lạnh thập cẩm nhiều màu, phù hợp người mới muốn trải nghiệm đa dạng dòng.',
        shortDescriptionEn: 'A mixed cold-water shrimp pack with diverse colors, great for beginners exploring varieties.',
        temperature: '20-26°C',
        tds: '150-250 ppm',
        gh: '4-8 dGH',
        lifespan: '1-2',
        images: ['shrimps/loanlanh1.png', 'shrimps/loanlanh1.png', 'shrimps/loanlanh1.png', 'shrimps/loanlanh1.png']
    },
    {
        id: 'tep-deep-blue',
        category: 'shrimps',
        nameVi: 'Tép Deep BlueBolt',
        nameEn: 'Deep BlueBolt Shrimp',
        shortDescriptionVi: 'Biến thể BlueBolt cao cấp với sắc xanh đậm toàn thân, hiếm và giá trị sưu tầm cao.',
        shortDescriptionEn: 'A premium BlueBolt variant with deep full-body blue coloration and high collector value.',
        temperature: '22-26°C',
        tds: '120-180 ppm',
        gh: '4-6 dGH',
        lifespan: '1.5-2',
        images: ['shrimps/deepblue1.png', 'shrimps/deepblue2.png', 'shrimps/deepblue3.png', 'shrimps/deepblue3.png']
    },
    {
        id: 'tep-bluebolt',
        category: 'shrimps',
        nameVi: 'Tép BlueBolt',
        nameEn: 'BlueBolt Shrimp',
        shortDescriptionVi: 'Dòng Taiwan Bee phổ biến với đầu xanh thân trắng, dễ tiếp cận cho người mới chơi tép ong.',
        shortDescriptionEn: 'A popular Taiwan Bee shrimp with blue head and white body, beginner-friendly for bee shrimp keepers.',
        temperature: '22-26°C',
        tds: '120-180 ppm',
        gh: '4-6 dGH',
        lifespan: '1.5-2',
        images: ['shrimps/bluebolt1.png', 'shrimps/bluebolt1.png', 'shrimps/bluebolt1.png', 'shrimps/bluebolt1.png']
    },
    {
        id: 'tep-wine-red',
        category: 'shrimps',
        nameVi: 'Tép Wine Red',
        nameEn: 'Wine Red Shrimp',
        shortDescriptionVi: 'Tép ong cao cấp với họa tiết đỏ rượu vang và trắng, nổi bật và rất được ưa chuộng.',
        shortDescriptionEn: 'A premium bee shrimp with wine-red and white patterning, highly sought after by hobbyists.',
        temperature: '22-26°C',
        tds: '120-180 ppm',
        gh: '4-6 dGH',
        lifespan: '1.5-2',
        images: ['shrimps/dark-winered1.png', 'shrimps/red-mosura1.png', 'shrimps/red-mosura1.png', 'shrimps/red-mosura1.png']
    },
    {
        id: 'tep-black-galaxy-fishbone-snowflake',
        category: 'shrimps',
        nameVi: 'Tép Black Galaxy Fishbone Snowflake',
        nameEn: 'Black Galaxy Fishbone Snowflake Shrimp',
        shortDescriptionVi: 'Tép lạnh cao cấp với họa tiết thiên hà đen và tuyết rơi.',
        shortDescriptionEn: 'Premium cold-water shrimp with black galaxy and snowflake patterns.',
        temperature: '20-24°C',
        tds: '90-150 ppm',
        gh: '3-6 dGH',
        lifespan: '2-3',
        images: ['shrimps/black-glx1.png', 'shrimps/black-glx2.png', 'shrimps/black-glx3.png', 'shrimps/black-glx4.png']
    },
    {
        id: 'tep-black-galaxy-boa',
        category: 'shrimps',
        nameVi: 'Tép Black Galaxy BOA',
        nameEn: 'Black Galaxy BOA Shrimp',
        shortDescriptionVi: 'Vua của các loại tép lạnh với vẻ đẹp tuyệt đỉnh và giá trị cực cao.',
        shortDescriptionEn: 'The king of cold-water shrimp with ultimate beauty and extreme value.',
        temperature: '18-22°C',
        tds: '80-120 ppm',
        gh: '2-5 dGH',
        lifespan: '3-4',
        images: ['shrimps/black-glx5.png', 'shrimps/black-glx6.png', 'shrimps/black-glx7.png', 'shrimps/black-glx8.png']
    },
    {
        id: 'tep-red-galaxy-tiger',
        category: 'shrimps',
        nameVi: 'Tép Red Galaxy Tiger',
        nameEn: 'Red Galaxy Tiger Shrimp',
        shortDescriptionVi: 'Tép lạnh với màu đỏ rực rỡ, họa tiết sọc hổ và chấm galaxy.',
        shortDescriptionEn: 'Cold-water shrimp with vibrant red, tiger stripes and galaxy spots.',
        temperature: '20-24°C',
        tds: '100-160 ppm',
        gh: '3-6 dGH',
        lifespan: '2-2.5',
        images: ['shrimps/red-glx1.png', 'shrimps/red-glx2.png', 'shrimps/red-glx3.png', 'shrimps/red-glx4.png']
    },
    // Sample plants products (replaced old fish samples)
    {
        id: 'reu-mini-taiwan',
        category: 'plants',
        nameVi: 'Rêu Mini Taiwan',
        nameEn: 'Mini Taiwan Moss',
        shortDescriptionVi: 'Rêu thủy sinh rất nhỏ, tạo thảm xanh dày và mềm mại cho tiền cảnh.',
        shortDescriptionEn: 'A tiny moss that forms dense, soft green carpets for foreground layouts.',
        temperature: '22-28°C',
        tds: 'N/A',
        gh: 'Soft to hard',
        lifespan: 'N/A',
        images: ['plants/mini-taiwan.png', 'plants/mini-taiwan.png', 'plants/mini-taiwan.png', 'plants/mini-taiwan.png']
    },
    {
        id: 'reu-pelia',
        category: 'plants',
        nameVi: 'Rêu Pelia',
        nameEn: 'Pelia Moss',
        shortDescriptionVi: 'Rêu dạng tản lá gan độc đáo, phù hợp tạo điểm nhấn tự nhiên trong bố cục.',
        shortDescriptionEn: 'A unique liverwort-like moss ideal for creating natural focal points.',
        temperature: '18-26°C',
        tds: 'N/A',
        gh: 'Soft to medium',
        lifespan: 'N/A',
        images: ['plants/pelia.png', 'plants/pelia.png', 'plants/pelia.png', 'plants/pelia.png']
    },
    // Sample accessory products
    {
        id: 'may-loc-nuoc',
        category: 'accessory',
        nameVi: 'Máy Lọc Nước Mini',
        nameEn: 'Mini Water Filter',
        shortDescriptionVi: 'Máy lọc nước nhỏ gọn phù hợp cho bể nano, duy trì chất lượng nước tốt.',
        shortDescriptionEn: 'Compact water filter suitable for nano tanks, maintains good water quality.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '1-2',
        images: ['accessories/hbl-803.png', 'accessories/hbl-803.png', 'accessories/hbl-803.png', 'accessories/hbl-803.png']
    },
    {
        id: 'den-led-thuy-sinh',
        category: 'accessory',
        nameVi: 'Đèn LED Thủy Sinh',
        nameEn: 'LED Aquarium Light',
        shortDescriptionVi: 'Đèn LED chuyên dụng cho thủy sinh, hỗ trợ quang hợp và tăng màu sắc.',
        shortDescriptionEn: 'Specialized LED light for aquariums, supports photosynthesis and enhances colors.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '3-5',
        images: ['accessories/flat-nano.png', 'accessories/plant2.png', 'accessories/plant3.png', 'accessories/plant4.png']
    },
    // New accessory products
    {
        id: 'loc-qs200',
        category: 'accessory',
        nameVi: 'Lọc QS200',
        nameEn: 'QS200 Filter',
        shortDescriptionVi: 'Combo lọc vi sinh cao cấp từ Qanvee, tích hợp công nghệ denitrate khử nitrat hiệu quả.',
        shortDescriptionEn: 'Premium biological filtration combo from Qanvee with advanced denitrate technology for effective nitrate removal.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '2-3',
        images: ['accessories/qs200a.png', 'accessories/qs200a.png', 'accessories/qs200a.png', 'accessories/qs200a.png']
    },
    {
        id: 'den-neo-helios',
        category: 'accessory',
        nameVi: 'Đèn Neo-Helios',
        nameEn: 'Neo-Helios Light',
        shortDescriptionVi: 'Đèn LED RGB 3 in 1 cao cấp với công nghệ Solar Light, thiết kế phẳng hiện đại.',
        shortDescriptionEn: 'Premium RGB LED 3-in-1 light with Solar Light technology and modern flat design.',
        temperature: 'N/A',
        tds: 'N/A',
        gh: 'N/A',
        lifespan: '5-7',
        images: ['accessories/flat-nano.png', 'accessories/flat-nano.png', 'accessories/flat-nano.png', 'accessories/flat-nano.png']
    },
    // Plants products
    {
        id: 'ray-nana-petite',
        category: 'plants',
        nameVi: 'Ráy Nana Petite',
        nameEn: 'Anubias Nana Petite',
        shortDescriptionVi: 'Phiên bản mini của ráy nana, lá rất nhỏ và dày, hợp cho bể nano và tiền cảnh.',
        shortDescriptionEn: 'A miniature Anubias with tiny dense leaves, perfect for nano tanks and foreground.',
        temperature: '20-28°C',
        tds: 'N/A',
        gh: 'Soft to hard',
        lifespan: 'N/A',
        images: ['plants/nanapettie1.png', 'plants/nanapettie2.png', 'plants/nanapettie3.png', 'plants/nanapettie1.png']
    },
    {
        id: 'bucephalandra',
        category: 'plants',
        nameVi: 'Bucephalandra',
        nameEn: 'Bucephalandra',
        shortDescriptionVi: 'Dòng cây thân rễ cao cấp với nhiều biến thể màu lá, phát triển chậm và bền.',
        shortDescriptionEn: 'A premium rhizome plant group with diverse leaf colors, slow but stable growth.',
        temperature: '22-28°C',
        tds: 'N/A',
        gh: 'Soft to medium',
        lifespan: 'N/A',
        images: ['plants/bucep.png', 'plants/bucep.png', 'plants/bucep.png', 'plants/bucep.png']
    },
    {
        id: 'duong-xi-java',
        category: 'plants',
        nameVi: 'Dương Xỉ Java',
        nameEn: 'Java Fern',
        shortDescriptionVi: 'Cây dương xỉ thủy sinh kinh điển, dễ trồng, phù hợp cả bể low-tech.',
        shortDescriptionEn: 'A classic, easy-to-grow aquatic fern suitable even for low-tech aquariums.',
        temperature: '20-30°C',
        tds: 'N/A',
        gh: 'Soft to hard',
        lifespan: 'N/A',
        images: ['plants/java.png', 'plants/java.png', 'plants/java.png', 'plants/java.png']
    },
    {
        id: 'duong-xi-chau-phi',
        category: 'plants',
        nameVi: 'Dương Xỉ Châu Phi',
        nameEn: 'African Fern',
        shortDescriptionVi: 'Dương xỉ nước với lá kép chia thùy sâu, độc đáo và dễ chăm sóc trong aquascape.',
        shortDescriptionEn: 'Aquatic fern with compound, deeply divided leaves, unique and easy to care for in aquascaping.',
        temperature: '20-28°C',
        tds: 'N/A',
        gh: 'Soft to medium',
        lifespan: 'N/A',
        images: ['plants/dxcp.png', 'plants/dxcp.png', 'plants/dxcp.png', 'plants/dxcp.png']
    },
    {
        id: 'duong-xi-la-kim',
        category: 'plants',
        nameVi: 'Dương Xỉ Lá Kim',
        nameEn: 'Needle Leaf Fern',
        shortDescriptionVi: 'Biến thể lá mảnh của dương xỉ Java, tạo chuyển động mềm mại trong bố cục.',
        shortDescriptionEn: 'A narrow-leaf Java Fern variant that adds soft movement to aquascapes.',
        temperature: '18-30°C',
        tds: 'N/A',
        gh: 'Soft to hard',
        lifespan: 'N/A',
        images: ['plants/dxlk.png', 'plants/dxlk.png', 'plants/dxlk.png', 'plants/dxlk.png']
    }
];