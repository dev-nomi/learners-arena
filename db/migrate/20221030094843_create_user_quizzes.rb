class CreateUserQuizzes < ActiveRecord::Migration[6.1]
  def change
    create_table :user_quizzes do |t|
      t.boolean :attempted, default: false
      t.integer :status
      t.integer :marks, default: 0
      t.text    :ans_keys
      t.belongs_to :user
      t.belongs_to :quiz

      t.timestamps
    end
  end
end
