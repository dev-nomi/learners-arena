class UserQuiz < ApplicationRecord
  validates :quiz, uniqueness: { scope: :user }
  serialize :ans_keys, Array

  delegate :course, to: :quiz
  
  belongs_to :user
  belongs_to :quiz

  enum status: [:in_progress, :checked]
end