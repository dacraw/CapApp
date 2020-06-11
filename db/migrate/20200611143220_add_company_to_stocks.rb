class AddCompanyTwoToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :company, :string, null: true
  end
end
