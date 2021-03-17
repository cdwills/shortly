defmodule ShortlyWeb.HomeController do
  use ShortlyWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
