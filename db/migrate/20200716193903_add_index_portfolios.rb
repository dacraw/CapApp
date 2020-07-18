class AddIndexPortfolios < ActiveRecord::Migration[5.2]
  def change
    add_index :portfolios, :user_id
    add_index :portfolios, :symbol
    add_index :portfolios, :num_shares
    add_index :portfolios, :created_at
  end
end
