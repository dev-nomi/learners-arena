class Video < ApplicationRecord
  validates :display_name, :description, :week_no, presence: true
  validates :file, {
    presence: true
  }

  has_one_attached :file
  belongs_to :course
  belongs_to :user
end