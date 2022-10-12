class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :title
      t.string :question_type
      t.string :ans_key
      t.json   :options

      t.timestamps
    end
  end
end
