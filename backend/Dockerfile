FROM elixir:1.11.4

RUN apt-get update && \
  apt-get install -y postgresql-client

RUN mix local.hex --force
RUN mix local.rebar --force

ENV MIX_DEPS_PATH=/app/mix/deps

ENV MIX_BUILD_PATH=/app/mix/build

WORKDIR /app/code

COPY config ./config
COPY mix.exs mix.lock ./

COPY entrypoint.sh ./app/entrypoint.sh

RUN chmod +x ./app/entrypoint.sh

RUN mix do deps.get, deps.compile

VOLUME /app/code

CMD ["./entrypoint.sh"]
