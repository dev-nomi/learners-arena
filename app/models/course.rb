class Course < ApplicationRecord
  validates :display_name, :description, presence: true, uniqueness: { case_sensitive: false }
  has_one_attached :image

  validates :image, {
    presence: true
  }
  
  belongs_to :user
  has_many :handouts
  has_many :enrolled_courses
  has_many :users, through: :enrolled_courses, source: :user
end