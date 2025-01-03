# Next.js Docker Template with PostgreSQL

A production-ready Next.js template with Docker, PostgreSQL, and automatic deployment to VPS. This template provides a complete setup for developing and deploying Next.js applications.

## Features

- 🚀 Next.js 15 with App Router
- 🐳 Docker and Docker Compose setup
- 🐘 PostgreSQL database with Prisma ORM
- 🔒 HTTPS with automatic SSL certification
- 🔄 Development hot reloading
- 🚦 GitHub Actions CI/CD pipeline
- 🌐 Nginx reverse proxy

## Prerequisites

- Node.js 20+
- Docker and Docker Compose
- Git
- VPS (Recommended: [HostMyServers](https://www.hostmyservers.fr/))
- A GitHub account with:
  - Access to GitHub Container Registry (GHCR)
  - Permission to create repositories and secrets

## Quick Start

1. Clone and setup:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   cp .env.development.example .env
   ```

2. Start development environment:
   ```bash
   docker compose up --build
   ```

3. Open [http://localhost:8080](http://localhost:8080) in your browser

## Development

### Local Development
The development environment is configured with hot reloading and debugging capabilities:

```bash
# Start development containers
docker compose up --build

# Run database migrations
docker compose exec web npx prisma migrate dev

# View logs
docker compose logs -f
```

### Environment Variables
We provide two example environment files:

1. `.env.development.example` - Local development variables
   ```bash
   # For local development
   cp .env.development.example .env
   ```
   Contains variables for:
   - Local database configuration
   - Development server settings
   - Hot reload configuration

2. `.env.production.example` - Production deployment variables
   ```bash
   # For production deployment
   cp .env.production.example .env
   ```
   Contains variables for:
   - Production database credentials
   - Domain configuration
   - SSL certificates
   - GitHub Container Registry
   - VPS deployment settings

Make sure to:
- Never commit your actual `.env` file
- Use strong passwords in production
- Keep your tokens and SSH keys secure

## Deployment

### VPS Setup with HostMyServers

1. Sign up for a VPS at [HostMyServers](https://www.hostmyservers.fr/)
   - French hosting provider with excellent support
   - Reliable infrastructure
   - Competitive pricing

2. Configure your server:
   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh

   # Install Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose

   # Install Nginx
   sudo apt update
   sudo apt install nginx
   ```

3. Set up SSL certificates:
   ```bash
   # Install certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Generate certificates
   sudo certbot --nginx -d yourdomain.com
   ```

### GitHub Actions Setup

1. Add these secrets to your GitHub repository:
   - `VPS_HOST`: Your VPS IP address
   - `VPS_USERNAME`: Your VPS username (usually 'root')
   - `VPS_SSH_KEY`: Your SSH private key
   - `GHCR_TOKEN`: GitHub Container Registry token
   - `DOCKER_COMPOSE_PROD`: Production docker-compose.yml content
   - `NGINX_CONF`: Production nginx.conf content
   - `POSTGRES_USER`: PostgreSQL username
   - `POSTGRES_PASSWORD`: PostgreSQL password
   - `POSTGRES_DB`: PostgreSQL database name

2. Update the domain in `.github/workflows/deploy.yml`:
   ```yaml
   PRODUCTION_DOMAIN: yourdomain.com
   ```

3. Update the repository name in the GitHub Container Registry URL:
   ```yaml
   IMAGE_NAME: ${{ github.repository }}
   ```

## Deployment Process

The deployment process is automated through GitHub Actions:

1. **Build and Test**
   - Build the Next.js application
   - Run tests

2. **Docker Image**
   - Build and push to GHCR

3. **Database Migration**
   - Run Prisma migrations

4. **Application Deployment**
   - Deploy services in order:
     1. PostgreSQL
     2. Migrations
     3. Next.js app
     4. Nginx

## Project Structure

```
.
├── .github/workflows    # GitHub Actions workflows
├── nginx               # Nginx configuration
├── prisma             # Database schema and migrations
├── src                # Application source code
├── docker-compose.yml        # Development configuration
├── docker-compose.prod.yml   # Production configuration
└── next.config.ts     # Next.js configuration
```

## Troubleshooting

1. **Database Connection Issues**
   - Check PostgreSQL container status
   - Verify credentials
   - Check logs: `docker-compose -f docker-compose.prod.yml logs db`

2. **Migration Issues**
   - Check logs: `docker-compose -f docker-compose.prod.yml logs migrations`
   - Verify DATABASE_URL

3. **Application Issues**
   - Check logs: `docker-compose -f docker-compose.prod.yml logs web`
   - Verify environment variables

4. **Nginx/SSL Issues**
   - Check logs: `docker-compose -f docker-compose.prod.yml logs nginx`
   - Verify SSL certificate setup

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Credits

- [Next.js](https://nextjs.org/) - The React Framework
- [Docker](https://www.docker.com/) - Container Platform
- [PostgreSQL](https://www.postgresql.org/) - Database
- [HostMyServers](https://www.hostmyservers.fr/) - VPS Hosting Provider
  - Reliable French hosting
  - Excellent customer support
  - High-performance infrastructure

## License

This project is licensed under the MIT License - see the LICENSE file for details.
