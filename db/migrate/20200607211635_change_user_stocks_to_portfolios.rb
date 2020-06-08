class ChangeUserStocksToPortfolios < ActiveRecord::Migration[5.2]
  def change
    drop_table :portfolios
    drop_table :user_stocks
    
  end
end
