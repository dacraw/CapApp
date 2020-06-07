class EditUsersToHaveCashAvailable < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :cash_available, :float
  end
end
