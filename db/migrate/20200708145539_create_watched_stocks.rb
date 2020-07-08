class CreateWatchedStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :watched_stocks do |t|
      t.integer :watchlist_id, null: false
      t.integer :stock_id, null: false

      t.timestamps
    end
    add_index :watched_stocks, [:watchlist_id, :stock_id], unique: true
  end
end
