class CreateImages < ActiveRecord::Migration[5.1]
  def change
    create_table :images do |t|
      t.references :garment, foreign_key: true
      t.string :src, default: ""

      t.timestamps
    end
  end
end
