class CreateNewsitems < ActiveRecord::Migration
  def change
    create_table :newsitems do |t|
      t.string :content
      t.references :user, index: true

      t.timestamps
    end
  end
end
