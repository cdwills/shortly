FROM elixir:latest

RUN apt-get update && \
  apt-get install -y postgresql-client

WORKDIR /app

COPY . /app
RUN chmod +x /app/entrypoint.sh

RUN mix local.hex --force
RUN mix local.rebar --force

RUN mix deps.get

CMD ["./entrypoint.sh"]
