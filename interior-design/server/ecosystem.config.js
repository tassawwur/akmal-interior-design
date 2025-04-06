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
        PORT: 5000
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