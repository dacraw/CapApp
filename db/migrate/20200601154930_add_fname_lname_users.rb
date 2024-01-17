class AddFnameLnameUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :fname, :string, null: false
    add_column :users, :lname, :string, null: false
  end
end
