class AddEmailToAddress < ActiveRecord::Migration[5.2]
  def change
    add_column :addresses, :email, :string
  end
end
