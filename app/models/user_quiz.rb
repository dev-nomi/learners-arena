class UserQuiz < ApplicationRecord
  validates :quiz, uniqueness: { scope: :user }
  serialize :ans_keys, Array

  belongs_to :user
  belongs_to :quiz

  enum status: [:IN_PROGRESS, :CHECKED]
end