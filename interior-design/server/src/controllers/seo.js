const SEO = require('../models/SEO');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get SEO data for a specific page
// @route   GET /api/seo/page/:pagePath
// @access  Public
exports.getSEOByPage = asyncHandler(async (req, res, next) => {
  const pagePath = req.params.pagePath;
  
  const seoData = await SEO.findOne({ pagePath });
  
  if (!seoData) {
    return next(new ErrorResponse(`No SEO data found for page: ${pagePath}`, 404));
  }
  
  res.status(200).json({
    success: true,
    data: seoData
  });
});

// @desc    Get all SEO data
// @route   GET /api/seo
// @access  Private/Admin
exports.getAllSEO = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Create SEO data
// @route   POST /api/seo
// @access  Private/Admin
exports.createSEO = asyncHandler(async (req, res, next) => {
  // Check if SEO data already exists for this page
  const existingSEO = await SEO.findOne({ pagePath: req.body.pagePath });
  
  if (existingSEO) {
    return next(new ErrorResponse(`SEO data already exists for page: ${req.body.pagePath}`, 400));
  }
  
  const seo = await SEO.create(req.body);
  
  res.status(201).json({
    success: true,
    data: seo
  });
});

// @desc    Update SEO data
// @route   PUT /api/seo/:id
// @access  Private/Admin
exports.updateSEO = asyncHandler(async (req, res, next) => {
  let seo = await SEO.findById(req.params.id);
  
  if (!seo) {
    return next(new ErrorResponse(`SEO data not found with id of ${req.params.id}`, 404));
  }
  
  seo = await SEO.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: seo
  });
});

// @desc    Delete SEO data
// @route   DELETE /api/seo/:id
// @access  Private/Admin
exports.deleteSEO = asyncHandler(async (req, res, next) => {
  const seo = await SEO.findById(req.params.id);
  
  if (!seo) {
    return next(new ErrorResponse(`SEO data not found with id of ${req.params.id}`, 404));
  }
  
  await seo.deleteOne();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Generate sitemap.xml
// @route   GET /api/seo/sitemap
// @access  Public
exports.generateSitemap = asyncHandler(async (req, res, next) => {
  // Get all SEO entries
  const seoEntries = await SEO.find();
  
  // Base URL of the website
  const baseUrl = process.env.WEBSITE_URL || 'https://akmal.com';
  
  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add each page to sitemap
  seoEntries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${entry.pagePath}</loc>\n`;
    xml += `    <lastmod>${entry.updatedAt.toISOString()}</lastmod>\n`;
    xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  // Send XML response
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// @desc    Generate robots.txt
// @route   GET /api/seo/robots
// @access  Public
exports.generateRobotsTxt = asyncHandler(async (req, res, next) => {
  // Base URL of the website
  const baseUrl = process.env.WEBSITE_URL || 'https://akmal.com';
  
  // Generate robots.txt content
  let robotsTxt = 'User-agent: *\n';
  robotsTxt += 'Allow: /\n\n';
  
  // Get all pages that should be excluded from indexing
  const noIndexPages = await SEO.find({ robotsTxt: { $in: ['noindex, follow', 'noindex, nofollow'] } });
  
  // Add disallow rules for noindex pages
  noIndexPages.forEach(page => {
    robotsTxt += `Disallow: ${page.pagePath}\n`;
  });
  
  robotsTxt += `\nSitemap: ${baseUrl}/sitemap.xml\n`;
  
  // Send robots.txt response
  res.header('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

// @desc    Generate SEO meta tags
// @route   GET /api/seo/meta/:pagePath
// @access  Public
exports.generateMetaTags = asyncHandler(async (req, res, next) => {
  const pagePath = req.params.pagePath;
  
  const seoData = await SEO.findOne({ pagePath });
  
  if (!seoData) {
    return next(new ErrorResponse(`No SEO data found for page: ${pagePath}`, 404));
  }
  
  // Generate meta tags HTML
  let metaHTML = '';
  
  // Title
  metaHTML += `<title>${seoData.title}</title>\n`;
  
  // Description
  if (seoData.description) {
    metaHTML += `<meta name="description" content="${seoData.description}">\n`;
  }
  
  // Keywords
  if (seoData.keywords) {
    metaHTML += `<meta name="keywords" content="${seoData.keywords}">\n`;
  }
  
  // Open Graph
  if (seoData.ogTitle) {
    metaHTML += `<meta property="og:title" content="${seoData.ogTitle}">\n`;
  }
  
  if (seoData.ogDescription) {
    metaHTML += `<meta property="og:description" content="${seoData.ogDescription}">\n`;
  }
  
  if (seoData.ogImage) {
    metaHTML += `<meta property="og:image" content="${seoData.ogImage}">\n`;
  }
  
  // Canonical URL
  if (seoData.canonicalUrl) {
    metaHTML += `<link rel="canonical" href="${seoData.canonicalUrl}">\n`;
  }
  
  // Robots
  metaHTML += `<meta name="robots" content="${seoData.robotsTxt}">\n`;
  
  // Structured data
  if (seoData.structuredData) {
    metaHTML += `<script type="application/ld+json">\n${seoData.structuredData}\n</script>\n`;
  }
  
  res.status(200).json({
    success: true,
    metaHTML
  });
}); 