class Quiz < ApplicationRecord
  validates :display_name, :description, :week_no, presence: true
  
  validates_format_of :display_name, :description, with: /\A[A-Za-z]/, message: "can't start with digit"
  
  belongs_to :user
  belongs_to :course
  has_many :questions, dependent: :destroy
  has_many :user_quizzes, dependent: :destroy
  has_many :students, through: :user_quizzes, source: :user
end