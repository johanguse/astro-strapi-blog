#!/bin/bash
source .env

echo "Coyping init.sql to docker container"

docker cp init.sql ${PROJECT_SLUG}_postgres:init.sql

echo "Seeding database"
# Connect to the PostgreSQL container
docker exec -it ${PROJECT_SLUG}_postgres bash -c "
    # Inside the container, execute PostgreSQL commands
    psql -U $DATABASE_USERNAME -d $DATABASE_NAME -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public;'
    psql -U $DATABASE_USERNAME -d $DATABASE_NAME -f init.sql
"
