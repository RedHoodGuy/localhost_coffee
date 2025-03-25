# Database details for the Docker container
DB_NAME=mydatabase
DB_USER=postgres
DB_PASSWORD=secret
DB_HOST=localhost
DB_PORT=5432
CONTAINER_NAME=postgres-container  # Name of your Docker container

NODE_ENV=production

# Command to create a database (if needed)
CREATE_DB_CMD = docker exec -it $(CONTAINER_NAME) psql -U $(DB_USER) -d postgres -c "SELECT 'CREATE DATABASE $(DB_NAME)' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$(DB_NAME)')"

# Command to drop a database
DROP_DB_CMD = docker exec -it $(CONTAINER_NAME) psql -U $(DB_USER) -d postgres -c "DROP DATABASE IF EXISTS $(DB_NAME);"

# Command to run prisma migrations
PRISMA_MIGRATE_CMD = npx prisma migrate deploy

# Makefile


MIGRATE_PROD_CMD = npx prisma migrate deploy

# Reset the database (drop and recreate)
db-reset:
	@echo "Dropping and recreating the database..."
	$(DROP_DB_CMD)
	$(CREATE_DB_CMD)
	@echo "Database reset complete!"

# Set up the database (create if necessary, and apply migrations)
db-setup:
	@echo "Creating the database if it doesn't exist..."
	$(CREATE_DB_CMD)
	@echo "Applying Prisma migrations..."
	$(PRISMA_MIGRATE_CMD)
	@echo "Database setup complete!"

# Command to apply Prisma migrations and regenerate Prisma client
migrate:
	@echo "Applying Prisma migrations and regenerating Prisma client..."
	$(MIGRATE_PROD_CMD)          # Apply migrations based on the environment
	npx prisma generate      # Regenerate the Prisma client
	@echo "Prisma migrations applied and client regenerated."

	# Default migration name if none is provided

MIGRATION_NAME ?= "initial_migration"

# Command to generate the migration and the Prisma client
migrate-dev:
	@echo "Creating migration with name: $(MIGRATION_NAME)..."
	npx prisma migrate dev --name $(MIGRATION_NAME)  # Apply the migration
	npx prisma generate                           # Regenerate Prisma client
	@echo "Migration applied and Prisma client regenerated."