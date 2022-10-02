class Course < ApplicationRecord
  validates :display_name, :description, presence: true, uniqueness: { case_sensitive: false }
  has_one_attached :image

  validates :image, {
    presence: true
  }
end