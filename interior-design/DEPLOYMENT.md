# Deployment Guide for Akmal Interior Design

This guide provides step-by-step instructions for deploying the Akmal Interior Design website to production.

## Prerequisites

- A server running Ubuntu 20.04 or higher
- Domain name (e.g., akmalinteriors.com) with DNS configured
- Docker and Docker Compose installed
- Node.js 14.x or higher (for local development only)
- Git installed

## Deployment Options

### Option 1: Traditional Hosting (DigitalOcean, AWS EC2, etc.)

1. **Server Setup**

   ```bash
   # Update packages
   sudo apt update && sudo apt upgrade -y
   
   # Install required packages
   sudo apt install -y curl git build-essential nginx
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   
   # Add your user to the docker group
   sudo usermod -aG docker $USER
   newgrp docker
   ```

2. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/interior-design.git
   cd interior-design
   ```

3. **Configure Environment Variables**

   ```bash
   cd server
   cp .env.example .env
   nano .env
   ```
   
   Update the environment variables with your production values, especially:
   - MONGO_URI (production database)
   - JWT_SECRET (strong random string)
   - SITE_URL (your domain)
   - Admin credentials
   - SMTP details for email

4. **Build the Frontend**

   ```bash
   cd ../client
   npm install
   npm run build
   ```

5. **Deploy with Docker Compose**

   ```bash
   cd ../server
   mkdir -p nginx/certs
   
   # Copy your SSL certificates (from Let's Encrypt or other provider)
   # to nginx/certs/fullchain.pem and nginx/certs/privkey.pem
   
   # Start the application
   docker-compose up -d
   ```

6. **Set up SSL with Let's Encrypt**

   If you don't have SSL certificates yet:
   
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d akmalinteriors.com -d www.akmalinteriors.com
   
   # Copy certificates to the right location
   sudo cp /etc/letsencrypt/live/akmalinteriors.com/fullchain.pem nginx/certs/
   sudo cp /etc/letsencrypt/live/akmalinteriors.com/privkey.pem nginx/certs/
   sudo chown $USER:$USER nginx/certs/*.pem
   
   # Restart the containers
   docker-compose restart
   ```

### Option 2: Managed Hosting (Vercel, Netlify + DigitalOcean App Platform)

For a simpler deployment, you can use:

1. **Frontend**: Deploy to Vercel or Netlify
   - Connect your GitHub repository
   - Set build command to `cd client && npm install && npm run build`
   - Set output directory to `client/build`
   - Configure environment variables

2. **Backend**: Deploy to DigitalOcean App Platform
   - Create a new app from your repository
   - Point to the `server` directory
   - Set environment variables from your `.env` file
   - Enable automatic deployments
   - Configure the MongoDB connection

### Option 3: Serverless Deployment

1. **Frontend**: Deploy to Vercel or Netlify as described above

2. **Backend**: Deploy to AWS Lambda with Serverless Framework
   - Install Serverless Framework: `npm install -g serverless`
   - Add a `serverless.yml` configuration
   - Deploy with `serverless deploy`

## Domain Setup

1. **DNS Configuration**
   - Point your domain's A record to your server's IP address:
     - A record: `@` → your-server-ip
     - A record: `www` → your-server-ip
   - Wait for DNS to propagate (can take up to 48 hours)

2. **Verify Deployment**
   - Visit https://yourdomain.com
   - Test all functionality
   - Check health endpoint: https://yourdomain.com/health

## Maintenance

### Backups

Database backups run automatically according to the schedule in your `.env` file, but you can also run them manually:

```bash
cd interior-design/server
npm run db:backup
```

### Updates

To update the application:

```bash
cd interior-design
git pull
cd client
npm install
npm run build
cd ../server
docker-compose down
docker-compose up -d --build
```

### Monitoring

Monitor your application using:

- Docker logs: `docker-compose logs -f`
- Health endpoint: `https://yourdomain.com/health`
- Server logs: Check files in the `logs` directory

## Troubleshooting

- **Database Connection Issues**: Verify your MongoDB URI is correct and that network access is allowed from your server's IP
- **SSL Certificate Issues**: Check certificate paths and permissions
- **Performance Issues**: Check the health endpoint for resource usage

## Security Best Practices

1. Enable automatic security updates on your server
   ```bash
   sudo apt install unattended-upgrades
   sudo dpkg-reconfigure unattended-upgrades
   ```

2. Set up a firewall
   ```bash
   sudo ufw allow ssh
   sudo ufw allow http
   sudo ufw allow https
   sudo ufw enable
   ```

3. Regularly update dependencies
   ```bash
   npm audit fix
   ```

4. Set strong passwords for all services

## Contact

For deployment assistance, contact support@akmalinteriors.com 