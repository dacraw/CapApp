class CreateDailyStockQuotes < ActiveRecord::Migration[6.1]
  def change
    create_table :daily_stock_quotes do |t|
      t.belongs_to :stock
      t.json :data
      t.datetime :date_start
      t.datetime :date_end

      t.timestamps
    end
  end
end
