class AddSharePriceToPortfolios < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolios, :stock_price, :float
  end
end
