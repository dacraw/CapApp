class ChangeNullUsers < ActiveRecord::Migration[5.2]
  def change
    change_column_null :users, :cash_available, true
  end
end
