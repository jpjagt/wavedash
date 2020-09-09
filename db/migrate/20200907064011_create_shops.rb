class CreateShops < ActiveRecord::Migration[6.0]
  def change
    create_table :shops do |t|
      t.integer :selection_rating, default: 0
      t.string :name
      t.json :gmaps_data, default: {}

      t.timestamps
    end

    add_index :shops, :selection_rating
  end
end
