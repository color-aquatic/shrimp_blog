param(
    [Parameter(Mandatory = $true)]
    [string]$BucketName,

    [Parameter(Mandatory = $false)]
    [string]$DistributionId,

    [Parameter(Mandatory = $false)]
    [string]$Region = "ap-southeast-1"
)

$ErrorActionPreference = "Stop"

Write-Host "Uploading static assets to s3://$BucketName"

# Sync everything first
aws s3 sync dist "s3://$BucketName" --delete --region $Region

# HTML: short cache so content updates are reflected quickly
aws s3 cp dist/index.html "s3://$BucketName/index.html" --metadata-directive REPLACE --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html; charset=utf-8" --region $Region

# JS/CSS: long cache for better CloudFront hit ratio
Get-ChildItem -Path dist/js -Recurse -File | ForEach-Object {
    $key = $_.FullName.Replace((Resolve-Path dist).Path + "\\", "") -replace "\\", "/"
    aws s3 cp $_.FullName "s3://$BucketName/$key" --metadata-directive REPLACE --cache-control "public, max-age=31536000, immutable" --content-type "application/javascript; charset=utf-8" --region $Region
}

Get-ChildItem -Path dist/css -Recurse -File | ForEach-Object {
    $key = $_.FullName.Replace((Resolve-Path dist).Path + "\\", "") -replace "\\", "/"
    aws s3 cp $_.FullName "s3://$BucketName/$key" --metadata-directive REPLACE --cache-control "public, max-age=31536000, immutable" --content-type "text/css; charset=utf-8" --region $Region
}

# Images/content markdown: medium-long cache
Get-ChildItem -Path dist/images -Recurse -File | ForEach-Object {
    $key = $_.FullName.Replace((Resolve-Path dist).Path + "\\", "") -replace "\\", "/"
    aws s3 cp $_.FullName "s3://$BucketName/$key" --metadata-directive REPLACE --cache-control "public, max-age=2592000" --region $Region
}

Get-ChildItem -Path dist/posts -Recurse -File | ForEach-Object {
    $key = $_.FullName.Replace((Resolve-Path dist).Path + "\\", "") -replace "\\", "/"
    aws s3 cp $_.FullName "s3://$BucketName/$key" --metadata-directive REPLACE --cache-control "public, max-age=300" --content-type "text/markdown; charset=utf-8" --region $Region
}

Get-ChildItem -Path dist/collection -Recurse -File | ForEach-Object {
    $key = $_.FullName.Replace((Resolve-Path dist).Path + "\\", "") -replace "\\", "/"
    aws s3 cp $_.FullName "s3://$BucketName/$key" --metadata-directive REPLACE --cache-control "public, max-age=300" --content-type "text/markdown; charset=utf-8" --region $Region
}

if ($DistributionId) {
    Write-Host "Creating CloudFront invalidation for index and markdown..."
    aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/index.html" "/posts/*" "/collection/*"
}

Write-Host "Deploy completed successfully."
