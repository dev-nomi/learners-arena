class Assignment < ApplicationRecord
  validates :display_name, :description, :week_no, presence: true
  validates_format_of :display_name, :description, with: /\A[A-Za-z]/, message: "can't start with digit"
  
  belongs_to :course
  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :user_assignments, dependent: :destroy
  has_many :students, through: :user_assignments, source: :user
end