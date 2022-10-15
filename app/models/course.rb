class Course < ApplicationRecord
  validates :display_name, :description, presence: true, uniqueness: { case_sensitive: false }
  has_one_attached :image

  validates :image, {
    presence: true
  }
  enum level: [:beginner, :intermediate, :advanced]

  belongs_to :user
  has_many :handouts
  has_many :enrolled_courses
  has_many :users, through: :enrolled_courses, source: :user
  has_many :quizzes
end