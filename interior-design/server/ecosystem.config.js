module.exports = {
  apps: [
    {
      name: 'interior-design-api',
      script: 'src/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
        MONGO_URI: "mongodb+srv://tassawwurhussain61:Bh7bgbbMJDv8Pu2a@interiordesigncluster.graa0.mongodb.net/?retryWrites=true&w=majority&appName=InteriorDesignCluster",
        
        // Email configuration
        SMTP_HOST: "smtp.gmail.com", // Replace with your SMTP host
        SMTP_PORT: 587, // Replace with your SMTP port
        SMTP_EMAIL: "tassawwurhussain61@gmail.com", // Replace with your email
        SMTP_PASSWORD: "lafb jsqt ragl kdgm", // Replace with your email password or app password
        FROM_EMAIL: "noreply@akmalinteriors.com",
        FROM_NAME: "Akmal Interior Design",
        
        // Admin email to receive notifications
        ADMIN_EMAIL: "tassawwurhussain61@gmail.com" // Replace with your admin email
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      // Only restart if fails 5 times in 10 minutes
      max_restarts: 5,
      restart_delay: 5000,
      // Node.js specific options
      node_args: '--max-old-space-size=1024'
    }
  ],

  deploy: {
    production: {
      user: 'user',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/interior-design.git',
      path: '/opt/interior-design',
      'post-deploy': 'cd server && npm install && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save'
    }
  }
}; 