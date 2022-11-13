class Quiz < ApplicationRecord
  validates :display_name, :description, :week_no, presence: true
  
  belongs_to :user
  belongs_to :course
  has_many :questions, dependent: :destroy
  has_many :user_quizzes, dependent: :destroy
  has_many :users, through: :user_quizzes, source: :user
end