class EnrolledCourse < ApplicationRecord
  validates :course, uniqueness: { scope: :user }

  belongs_to :user
  belongs_to :course
end