class RemoveIndexPortfolios < ActiveRecord::Migration[5.2]
  def change
    remove_index :portfolios, name: "index_portfolios_on_user_id_and_symbol"
  end
end
