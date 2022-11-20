class AddSubmittedToUserQuiz < ActiveRecord::Migration[6.1]
  def change
    add_column :user_quizzes, :submitted, :boolean, default: false
  end
end
