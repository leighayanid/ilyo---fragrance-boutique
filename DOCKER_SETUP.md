# Docker Setup Guide

This guide will help you set up PostgreSQL and Redis using Docker for local development.

## Prerequisites

- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)

## Quick Start

### 1. Start Database Services

From the root directory, run:

```bash
docker-compose up -d
```

This will start:
- **PostgreSQL** on port 5432
- **Redis** on port 6379

### 2. Verify Services are Running

```bash
docker-compose ps
```

You should see both `ilyo-postgres` and `ilyo-redis` running.

### 3. Check Service Health

```bash
# Check PostgreSQL
docker-compose exec postgres pg_isready -U postgres

# Check Redis
docker-compose exec redis redis-cli ping
```

### 4. Set Up Environment Variables

```bash
# Copy environment variable templates
cp apps/storefront/.env.example apps/storefront/.env
cp packages/medusa-backend/.env.example packages/medusa-backend/.env
```

The default configuration in `.env.example` files already points to the Docker services:
- PostgreSQL: `postgresql://postgres:postgres@localhost:5432/medusa-db`
- Redis: `redis://localhost:6379`

### 5. Run Medusa Migrations

```bash
cd packages/medusa-backend
pnpm migrations
```

### 6. Start Development

```bash
# From root directory
pnpm dev
```

## Docker Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Stop Services and Remove Data
```bash
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs -f

# PostgreSQL only
docker-compose logs -f postgres

# Redis only
docker-compose logs -f redis
```

### Restart Services
```bash
docker-compose restart
```

## Database Management

### Access PostgreSQL CLI
```bash
docker-compose exec postgres psql -U postgres -d medusa-db
```

Common PostgreSQL commands:
```sql
-- List databases
\l

-- Connect to medusa-db
\c medusa-db

-- List tables
\dt

-- Exit
\q
```

### Access Redis CLI
```bash
docker-compose exec redis redis-cli
```

Common Redis commands:
```bash
# Check connection
PING

# List all keys
KEYS *

# Exit
EXIT
```

## Database Configuration

The Docker setup uses these default credentials (defined in [docker-compose.yml](docker-compose.yml)):

- **PostgreSQL**:
  - Host: `localhost`
  - Port: `5432`
  - User: `postgres`
  - Password: `postgres`
  - Database: `medusa-db`

- **Redis**:
  - Host: `localhost`
  - Port: `6379`
  - No password

**⚠️ Note**: These are development credentials. Never use these in production!

## Data Persistence

Database data is persisted in Docker volumes:
- `postgres_data` - PostgreSQL data
- `redis_data` - Redis data

Data will survive container restarts but can be removed with `docker-compose down -v`.

## Troubleshooting

### Port Already in Use

If ports 5432 or 6379 are already in use:

```bash
# Check what's using the port
lsof -i :5432
lsof -i :6379

# Stop local PostgreSQL/Redis if running
brew services stop postgresql
brew services stop redis
```

Or modify the ports in [docker-compose.yml](docker-compose.yml):

```yaml
ports:
  - "5433:5432"  # Use port 5433 instead
```

Then update `DATABASE_URL` in `.env` accordingly.

### Reset Database

To completely reset the database:

```bash
# Stop and remove containers and volumes
docker-compose down -v

# Start fresh
docker-compose up -d

# Re-run migrations
cd packages/medusa-backend
pnpm migrations
```

### Connection Issues

Make sure Docker containers are healthy:

```bash
docker-compose ps
```

Both services should show `healthy` status. If not:

```bash
# View logs
docker-compose logs postgres
docker-compose logs redis

# Restart services
docker-compose restart
```

## Production Deployment

For production, use managed database services:
- **PostgreSQL**: AWS RDS, Railway, Supabase, etc.
- **Redis**: AWS ElastiCache, Railway, Upstash, etc.

Never use Docker Compose for production databases.
