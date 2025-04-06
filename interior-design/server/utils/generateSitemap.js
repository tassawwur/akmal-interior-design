const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('./logger');

/**
 * Generate a sitemap.xml file for the website
 * Includes static routes and dynamic content from the database
 */
const generateSitemap = async () => {
  try {
    logger.info('Starting sitemap generation');
    
    // Ensure the database is connected
    if (mongoose.connection.readyState !== 1) {
      logger.info('Database not connected, connecting now');
      await mongoose.connect(config.MONGO_URI);
      logger.info('Database connected for sitemap generation');
    }

    // Start building the sitemap XML
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    const staticPages = [
      '',                   // Home page
      '/about',
      '/services',
      '/projects',
      '/contact',
      '/blog'
    ];

    for (const page of staticPages) {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${config.SITE_URL}${page}</loc>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      sitemap += `  </url>\n`;
    }

    // Add dynamic content - this is a placeholder where you'd add logic to fetch
    // dynamic content from your models and add them to the sitemap
    // Example models: Projects, Blog Posts, Services, etc.

    // Example: Add Blog Posts
    try {
      // This assumes you have a Blog model, if not, it will be skipped
      const Blog = mongoose.model('Blog');
      const blogs = await Blog.find({}).select('slug updatedAt').lean();
      
      for (const blog of blogs) {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${config.SITE_URL}/blog/${blog.slug}</loc>\n`;
        sitemap += `    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>\n`;
        sitemap += `    <changefreq>weekly</changefreq>\n`;
        sitemap += `    <priority>0.7</priority>\n`;
        sitemap += `  </url>\n`;
      }
      
      logger.info(`Added ${blogs.length} blog posts to sitemap`);
    } catch (error) {
      // Skip if Blog model doesn't exist yet
      logger.warn(`Skipping blog posts in sitemap: ${error.message}`);
    }

    // Example: Add Projects
    try {
      const Project = mongoose.model('Project');
      const projects = await Project.find({}).select('slug updatedAt').lean();
      
      for (const project of projects) {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${config.SITE_URL}/projects/${project.slug}</loc>\n`;
        sitemap += `    <lastmod>${new Date(project.updatedAt).toISOString()}</lastmod>\n`;
        sitemap += `    <changefreq>monthly</changefreq>\n`;
        sitemap += `    <priority>0.7</priority>\n`;
        sitemap += `  </url>\n`;
      }
      
      logger.info(`Added ${projects.length} projects to sitemap`);
    } catch (error) {
      // Skip if Project model doesn't exist yet
      logger.warn(`Skipping projects in sitemap: ${error.message}`);
    }

    // Example: Add Services
    try {
      const Service = mongoose.model('Service');
      const services = await Service.find({}).select('slug updatedAt').lean();
      
      for (const service of services) {
        sitemap += `  <url>\n`;
        sitemap += `    <loc>${config.SITE_URL}/services/${service.slug}</loc>\n`;
        sitemap += `    <lastmod>${new Date(service.updatedAt).toISOString()}</lastmod>\n`;
        sitemap += `    <changefreq>monthly</changefreq>\n`;
        sitemap += `    <priority>0.7</priority>\n`;
        sitemap += `  </url>\n`;
      }
      
      logger.info(`Added ${services.length} services to sitemap`);
    } catch (error) {
      // Skip if Service model doesn't exist yet
      logger.warn(`Skipping services in sitemap: ${error.message}`);
    }

    // Close the sitemap XML
    sitemap += '</urlset>';

    // Ensure public directory exists
    const publicDir = path.join(__dirname, '../../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write the sitemap to a file
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);
    logger.info(`Sitemap generated and saved to ${sitemapPath}`);

    // Generate robots.txt if it doesn't exist
    const robotsPath = path.join(publicDir, 'robots.txt');
    if (!fs.existsSync(robotsPath)) {
      let robotsTxt = `# robots.txt for ${config.SITE_NAME}\n`;
      robotsTxt += `User-agent: *\n`;
      robotsTxt += `Allow: /\n\n`;
      robotsTxt += `# Sitemap\n`;
      robotsTxt += `Sitemap: ${config.SITE_URL}/sitemap.xml\n`;
      
      fs.writeFileSync(robotsPath, robotsTxt);
      logger.info(`robots.txt generated and saved to ${robotsPath}`);
    }

    return { success: true, message: 'Sitemap generated successfully' };
  } catch (error) {
    logger.error(`Error generating sitemap: ${error.message}`);
    throw error;
  }
};

module.exports = generateSitemap; 