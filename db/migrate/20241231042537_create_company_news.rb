class CreateCompanyNews < ActiveRecord::Migration[8.0]
  def change
    create_table :company_news do |t|
      t.belongs_to :stock
      t.json :data, null: false
      
      t.timestamps
    end
  end
end
