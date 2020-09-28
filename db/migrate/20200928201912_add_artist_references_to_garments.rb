class AddArtistReferencesToGarments < ActiveRecord::Migration[6.0]
  def change
    add_reference :garments, :artist, null: true, foreign_key: true
  end
end
