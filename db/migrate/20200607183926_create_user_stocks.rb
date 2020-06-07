class CreateUserStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :user_stocks do |t|
      t.integer :portfolio_id, null: false
      t.integer :stock_id, null: false
      t.float :num_shares, null: false

      t.timestamps
    end
    add_index :user_stocks, [:portfolio_id, :stock_id], unique: true
  end
end
