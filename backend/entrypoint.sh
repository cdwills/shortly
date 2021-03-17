#!/bin/bash
# Docker entrypoint script.

# Wait until Postgres is ready
while ! pg_isready -q -d $DATABASE_URL
do
  echo "$(date) - waiting for database to start"
  sleep 2
done

# Create, migrate, and seed database if it doesn't exist.
if [[ -z `psql -Atqc "\\list $DATABASE_NAME"` ]]; then
  echo "****** Database $DATABASE_NAME does not exist. Creating..."
  mix ecto.create
  mix ecto.migrate
  mix run priv/repo/seeds.exs
  echo "****** Database $DATABASE_NAME created."
fi

exec mix phx.server
