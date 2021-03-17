defmodule ShortlyWeb.Router do
  use ShortlyWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :browser do
    plug :accepts, ["html"]
  end

  scope "/", ShortlyWeb do
    pipe_through :browser

    get "/", HomeController, :index
    get "/:hash", LinkController, :redirect_to
  end

  scope "/api", ShortlyWeb do
    pipe_through :api

    resources "/links", LinkController, except: [:new, :edit]
  end

  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: ShortlyWeb.Telemetry
    end
  end
end
