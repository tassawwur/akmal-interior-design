const fs = require('fs');
const path = require('path');
const Blog = require('../models/Blog');
const Project = require('../models/Project');
const Service = require('../models/Service');
const ConstructionService = require('../models/ConstructionService');
const TeamMember = require('../models/TeamMember');
const logger = require('./logger');

/**
 * Generate sitemap.xml file for the website
 * @param {string} websiteUrl - The base URL of the website
 * @param {string} outputPath - Path to save the sitemap.xml file
 */
const generateSitemap = async (websiteUrl, outputPath) => {
  try {
    // Remove trailing slash from the website URL if present
    const baseUrl = websiteUrl.endsWith('/') ? websiteUrl.slice(0, -1) : websiteUrl;
    
    // Start building the sitemap XML
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static pages
    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/services', priority: '0.9', changefreq: 'weekly' },
      { path: '/projects', priority: '0.9', changefreq: 'weekly' },
      { path: '/team', priority: '0.8', changefreq: 'weekly' },
      { path: '/blog', priority: '0.8', changefreq: 'daily' },
      { path: '/contact', priority: '0.8', changefreq: 'monthly' },
      { path: '/about', priority: '0.7', changefreq: 'monthly' },
      { path: '/clients', priority: '0.7', changefreq: 'monthly' }
    ];
    
    staticPages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}${page.path}</loc>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += '  </url>\n';
    });
    
    // Add dynamic pages from database
    // Blogs
    const blogs = await Blog.find({ published: true }).select('slug updatedAt');
    blogs.forEach(blog => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/blog/${blog.slug}</loc>\n`;
      sitemap += '    <priority>0.7</priority>\n';
      sitemap += '    <changefreq>weekly</changefreq>\n';
      if (blog.updatedAt) {
        sitemap += `    <lastmod>${blog.updatedAt.toISOString()}</lastmod>\n`;
      }
      sitemap += '  </url>\n';
    });
    
    // Projects
    const projects = await Project.find().select('slug updatedAt');
    projects.forEach(project => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/projects/${project.slug}</loc>\n`;
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '    <changefreq>monthly</changefreq>\n';
      if (project.updatedAt) {
        sitemap += `    <lastmod>${project.updatedAt.toISOString()}</lastmod>\n`;
      }
      sitemap += '  </url>\n';
    });
    
    // Services
    const services = await Service.find().select('slug updatedAt');
    services.forEach(service => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/services/${service.slug}</loc>\n`;
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '    <changefreq>monthly</changefreq>\n';
      if (service.updatedAt) {
        sitemap += `    <lastmod>${service.updatedAt.toISOString()}</lastmod>\n`;
      }
      sitemap += '  </url>\n';
    });
    
    // Construction Services
    const constructionServices = await ConstructionService.find().select('slug updatedAt');
    constructionServices.forEach(service => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/construction-services/${service.slug}</loc>\n`;
      sitemap += '    <priority>0.8</priority>\n';
      sitemap += '    <changefreq>monthly</changefreq>\n';
      if (service.updatedAt) {
        sitemap += `    <lastmod>${service.updatedAt.toISOString()}</lastmod>\n`;
      }
      sitemap += '  </url>\n';
    });
    
    // Team Members
    const teamMembers = await TeamMember.find().select('slug updatedAt');
    teamMembers.forEach(member => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/team/${member.slug}</loc>\n`;
      sitemap += '    <priority>0.6</priority>\n';
      sitemap += '    <changefreq>monthly</changefreq>\n';
      if (member.updatedAt) {
        sitemap += `    <lastmod>${member.updatedAt.toISOString()}</lastmod>\n`;
      }
      sitemap += '  </url>\n';
    });
    
    // Close the sitemap XML
    sitemap += '</urlset>';
    
    // Write the sitemap to a file
    fs.writeFileSync(outputPath, sitemap);
    
    logger.info(`Sitemap generated and saved to ${outputPath}`);
    return true;
  } catch (error) {
    logger.error(`Error generating sitemap: ${error.message}`);
    return false;
  }
};

module.exports = generateSitemap; 