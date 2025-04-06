# Akmal Interior Design - Production-Ready Website

Welcome to the Akmal Interior Design website repository. This is a full-stack application with a Node.js/Express backend API and a React frontend.

## Technologies Used

- **Backend:** Node.js, Express, MongoDB with Mongoose
- **Frontend:** React, Styled-Components
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** PM2, Nginx (recommended), Docker (optional)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd interior-design
   ```

2. Install dependencies:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000

   # MongoDB Database
   MONGO_URI=mongodb://localhost:27017/interior_design

   # JWT Authentication
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30

   # File Upload Settings
   MAX_FILE_UPLOAD=5000000
   FILE_UPLOAD_PATH=./public/uploads

   # Logging
   LOG_LEVEL=debug
   ```

4. Start the development server:
   ```bash
   # Run backend only
   npm run dev

   # Run frontend only
   cd client && npm start

   # Run both (requires concurrently)
   npm run dev
   ```

## Production Deployment Guide

### Option 1: Deploy on a VPS (DigitalOcean, AWS EC2, etc.)

1. **Provision a Server**
   - Recommended: Ubuntu 20.04 LTS
   - Minimum requirements: 1GB RAM, 1 CPU Core, 25GB SSD

2. **Install Dependencies**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y nodejs npm mongodb nginx
   sudo npm install -g pm2
   ```

3. **Clone Repository**
   ```bash
   git clone <repository-url> /var/www/akmal-interiors
   cd /var/www/akmal-interiors
   npm install
   ```

4. **Setup Environment Variables**
   ```bash
   nano .env
   # Add production environment variables
   ```

5. **Build the Client**
   ```bash
   npm run build-client
   ```

6. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/akmal-interiors
   ```

   Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/akmal-interiors /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Deploy with PM2**
   ```bash
   npm run deploy
   ```

8. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

### Option 2: Deploy to Render.com (Free/Paid options)

1. Create a Render account at [render.com](https://render.com)

2. Create a new Web Service
   - Connect to your GitHub repository
   - Select the branch to deploy
   - Use these settings:
     - **Build Command:** `npm install && npm run build-client`
     - **Start Command:** `npm run start:production`
     - **Environment Variables:** Add all your environment variables from .env

3. Create a MongoDB database
   - Use Render's managed database or MongoDB Atlas
   - Configure the MONGO_URI environment variable accordingly

### Option 3: Deploy to Vercel (Frontend) & MongoDB Atlas (Database)

1. Deploy the React frontend to Vercel
   ```bash
   cd client
   npm install -g vercel
   vercel login
   vercel
   ```

2. Deploy the backend to a suitable platform or VPS
   - Follow the VPS deployment steps above
   - Make sure to update the CORS settings to allow your Vercel frontend domain

## Maintenance & Monitoring

1. **View logs:**
   ```bash
   npm run logs
   ```

2. **Monitor application:**
   ```bash
   npm run monit
   ```

3. **Check status:**
   ```bash
   npm run status
   ```

4. **Restart application:**
   ```bash
   npm run restart
   ```

## Troubleshooting Common Deployment Issues

1. **Database Connection Issues:**
   - Check if MongoDB is running: `sudo systemctl status mongodb`
   - Verify the MONGO_URI environment variable is correct
   - Ensure your IP is whitelisted if using MongoDB Atlas

2. **CORS Errors:**
   - Update the CORS configuration in `src/server.js` with your frontend domain

3. **Memory Issues:**
   - Increase the PM2 max memory in `ecosystem.config.js`
   - Consider upgrading your server if you consistently hit memory limits

4. **Performance Optimization:**
   - Enable MongoDB indexing for frequently queried fields
   - Use the built-in caching middleware for API responses
   - Implement CDN for static assets

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Contact

For any inquiries or support, please contact:
- Email: support@akmalinteriors.com
- Website: https://akmalinteriors.com 