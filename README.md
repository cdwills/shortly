# Shortly

Elixir Phoenix & React powered URL Shortener

## Setup via Docker
```sh
git clone github@github.com/cdwills/shortly
docker-compose build --parallel
docker-compose up
open http://localhost:8080
```

## Project Info
### Frontend
- Created with `create-react-app`
- Using TailwindCSS
- `makefile` included for `setup`, `test`, and `server`
- Local dev server `http://localhost:3000`

### Backend
- Created with `Elixir / Phoenix`
- `PostgreSQL` storage
- `makefile` included for `setup`, `test`, and `server`
- All API endpoints located at `http://localhost:4000/api`

### Web
- Created with `NGINX`
- Proxies requests from both frontend and backend