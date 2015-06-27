class CreateProfileQuestions < ActiveRecord::Migration
  def change
    create_table :profile_questions do |t|
      t.string :text
      t.string :description
      t.string :type
      t.integer :order
      t.references :section, index: true

      t.timestamps
    end
  end
end
