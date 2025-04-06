# Akmal Interior Design - Backend Server

This is the backend server for the Akmal Interior Design website, providing API endpoints for the frontend application.

## Production-Ready Features

- **Authentication System**: Complete JWT-based authentication with protected routes
- **Database Optimization**: MongoDB indexing for performance and query efficiency
- **Automated Backups**: Scheduled database backups with retention management
- **Performance Optimization**: Response compression, caching, and database indexing
- **Security Enhancements**: Comprehensive security measures including XSS protection, rate limiting, and CSRF protection
- **CI/CD Pipeline**: Automated testing, building, and deployment
- **Monitoring & Health Checks**: System health monitoring and resource tracking
- **Container Support**: Docker and docker-compose configurations for deployment
- **PM2 Support**: Process management for Node.js applications

## Tech Stack

- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Winston Logger
- Node-Cache for API caching
- Node-Cron for scheduled tasks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/interior-design.git
cd interior-design/server
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit the `.env` file with your own values.

4. Start the development server
```bash
npm run dev
```

The server will start on the port specified in your environment variables (default: 5000).

### Production Deployment

For production deployment, you have several options:

#### Using PM2

```bash
npm run start:production
```

#### Using Docker

```bash
npm run docker:build
npm run docker:start
```

## Administrative Scripts

- Generate sitemap: `npm run generate-sitemap`
- Backup database: `npm run db:backup`
- Create database indexes: `npm run db:index`
- Security audit: `npm run security-check`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Send password reset email
- `PUT /api/auth/reset-password/:resetToken` - Reset password
- `PUT /api/auth/update-details` - Update user details
- `PUT /api/auth/update-password` - Update password

### File Uploads

- `POST /api/upload` - Upload a file (admin only)
- `GET /api/upload` - Get all uploads (admin only)
- `DELETE /api/upload/:id` - Delete a file (admin only)

### Other API endpoints

Additional endpoints for blogs, projects, services, etc., will be implemented as needed.

## Automated Tasks

The server includes automated tasks that run on schedules defined in environment variables:

- **Sitemap Generation**: Generates sitemap.xml for search engines
- **Cache Clearing**: Periodically clears API cache
- **Database Backup**: Creates database backups
- **Database Indexing**: Creates and maintains database indexes

## Monitoring

- Health check endpoint: `/health` - Returns system information and resource usage

## Security

This application implements several security measures:

- Helmet for securing HTTP headers with CSP policies
- Rate limiting to prevent brute force attacks
- Express-mongo-sanitize to prevent NoSQL injection
- XSS protection
- HTTP parameter pollution prevention
- Secure cookie settings

## License

ISC

---

For questions or support, please contact support@akmalinteriors.com 