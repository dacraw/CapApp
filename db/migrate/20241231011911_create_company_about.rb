class CreateCompanyAbout < ActiveRecord::Migration[8.0]
  def change
    create_table :company_abouts do |t|
      t.belongs_to :stock
      t.json :data, null: false

      t.timestamps
    end
  end
end
