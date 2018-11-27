class CreateTaps < ActiveRecord::Migration[5.2]
  def change
    create_table :taps do |t|
      t.string :identifier
      t.integer :taps, default: 0

      t.timestamps
    end
  end
end
