defmodule ShortlyWeb.LinkControllerTest do
  use ShortlyWeb.ConnCase

  alias Shortly.Links
  alias Shortly.Links.Link

  @create_attrs %{
    url: "https://elixir-lang.org/"
  }
  @update_attrs %{
    url: "https://www.stord.com"
  }
  @invalid_attrs %{url: nil}

  def fixture(:link) do
    {:ok, link} = Links.create_link(@create_attrs)
    link
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all links", %{conn: conn} do
      conn = get(conn, Routes.link_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create link" do
    test "renders link when data is valid", %{conn: conn} do
      conn = post(conn, Routes.link_path(conn, :create), link: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.link_path(conn, :show, id))
      url = @create_attrs.url
      assert %{
               "id" => ^id,
               "url" => ^url
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.link_path(conn, :create), link: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update link" do
    setup [:create_link]

    test "renders link when data is valid", %{conn: conn, link: %Link{id: id} = link} do
      conn = put(conn, Routes.link_path(conn, :update, link), link: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.link_path(conn, :show, id))
      url = @update_attrs.url
      assert %{
               "id" => ^id,
               "url" => ^url
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, link: link} do
      conn = put(conn, Routes.link_path(conn, :update, link), link: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "get link by hash" do
    setup [:create_link]

    test "redirects to url when hash is valid", %{link: %Link{hash: hash, url: url}}  do
      conn = build_conn()
      conn = get(conn, Routes.link_path(conn, :redirect_to, hash))
      assert redirected_to(conn) == url
    end
  end

  describe "delete link" do
    setup [:create_link]

    test "deletes chosen link", %{conn: conn, link: link} do
      conn = delete(conn, Routes.link_path(conn, :delete, link))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.link_path(conn, :show, link))
      end
    end
  end

  defp create_link(_) do
    link = fixture(:link)
    %{link: link}
  end
end
