class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.integer :user_id, null: false
      t.float :cash_available, null: false

      t.timestamps
    end
    add_index :portfolios, :user_id, unique: true
  end
end
