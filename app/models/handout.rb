class Handout < ApplicationRecord
  validates :display_name, :description, presence: true, uniqueness: { case_sensitive: false }
  has_one_attached :pdf

  validates :pdf, {
    presence: true
  }
end