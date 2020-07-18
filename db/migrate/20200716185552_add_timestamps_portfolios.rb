class AddTimestampsPortfolios < ActiveRecord::Migration[5.2]
  def change
    add_timestamps :portfolios, default: -> { 'now()' }, null: false
  end
end
