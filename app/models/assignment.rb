class Assignment < ApplicationRecord
  validates :display_name, :description, :week_no, presence: true

  belongs_to :course
  belongs_to :user
  has_many :questions, dependent: :destroy
end