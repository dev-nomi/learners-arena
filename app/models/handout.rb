class Handout < ApplicationRecord
  validates :display_name, :description, :week_no, presence: true
  validates :pdf, {
    presence: true
  }

  has_one_attached :pdf
  belongs_to :course
  belongs_to :user
end