class AddStatusIdToOrders < ActiveRecord::Migration[5.2]
  def change
    add_reference :orders, :status, foreign_key: true
  end
end
