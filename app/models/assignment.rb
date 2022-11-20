class Assignment < ApplicationRecord
  validates :display_name, :description, :week_no, presence: true

  belongs_to :course
  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :user_assignments, dependent: :destroy
  has_many :students, through: :user_assignments, source: :user
end