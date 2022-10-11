class AddUserAndCourseToQuizzes < ActiveRecord::Migration[6.1]
  def change
    add_reference :quizzes, :user, foreign_key: true
    add_reference :quizzes, :course, foreign_key: true
  end
end
