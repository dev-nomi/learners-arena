class Handout < ApplicationRecord
  validates :display_name, :description, presence: true
  has_one_attached :pdf

  validates :pdf, {
    presence: true
  }

  belongs_to :course
  belongs_to :user
end