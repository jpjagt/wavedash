class AddSizeToOrderItems < ActiveRecord::Migration[5.2]
  def change
    add_column :order_items, :size, :string
  end
end
