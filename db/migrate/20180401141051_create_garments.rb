class CreateGarments < ActiveRecord::Migration[5.1]
  def change
    create_table :garments do |t|
      t.string :name, default: ""
      t.text :description, default: ""
      t.integer :euros, default: 0
      t.integer :cents, max: 100, default: 0
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
