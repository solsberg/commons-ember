class CreateProfileSections < ActiveRecord::Migration
  def change
    create_table :profile_sections do |t|
      t.string :title
      t.integer :order

      t.timestamps
    end
  end
end
