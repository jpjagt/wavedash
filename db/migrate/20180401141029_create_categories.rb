class CreateCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :categories do |t|
      t.string :name, default: ""
      t.text :description, default: ""

      t.timestamps
    end
  end
end
