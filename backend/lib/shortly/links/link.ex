defmodule Shortly.Links.Link do
  use Ecto.Schema
  import Ecto.Changeset

  schema "links" do
    field :hash, :string
    field :url, :string

    timestamps()
  end

  @doc false
  def changeset(link, attrs) do
    link
    |> cast(attrs, [:hash, :url])
    |> validate_required([:hash, :url])
    |> validate_url(:url)
    |> unique_constraint(:hash)
    |> unique_constraint(:url)
  end

  defp validate_url(changeset, field, options \\ []) do
    validate_change changeset, field, fn _, value ->
      case EctoFields.URL.cast(value) do
        { :ok, _ } -> []
        :error -> [{ field, options[:message] || "invalid url"}]
      end
    end
  end
end
