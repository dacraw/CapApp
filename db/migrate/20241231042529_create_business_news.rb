class CreateBusinessNews < ActiveRecord::Migration[8.0]
  def change
    create_table :top_headline_news do |t|
      t.json :data, null: false
      
      t.timestamps
    end
  end
end
