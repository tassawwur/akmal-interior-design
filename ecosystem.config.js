module.exports = {
  apps: [
    {
      name: 'akmal-interior-design',
      script: 'src/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 80
      }
    }
  ],
  deploy: {
    production: {
      user: 'your-server-user',
      host: 'your-server-ip',
      ref: 'origin/main',
      repo: 'git@github.com:yourusername/interior-design.git',
      path: '/var/www/akmal-interiors',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
}; 