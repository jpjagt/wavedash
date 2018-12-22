class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :first_name
      t.string :last_name
      t.string :street
      t.string :postal_code
      t.string :city
      t.string :province
      t.string :country
      t.references :order, foreign_key: true

      t.timestamps
    end
  end
end
