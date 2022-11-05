class Quiz < ApplicationRecord
  validates :display_name, :description, presence: true
  
  belongs_to :user
  belongs_to :course
  has_many :questions, dependent: :destroy
  has_many :user_quizzes, dependent: :destroy
  has_many :users, through: :user_quizzes, source: :user

  after_create_commit :add_todo_quizzes_to_users

  def add_todo_quizzes_to_users
    users = course.users

    users.each do |user|
      todo_quiz = user.user_quizzes.build(quiz_id: self.id, status: 'IN_PROGRESS')
      todo_quiz.save!
    end
  end
end