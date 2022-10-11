class Quiz < ApplicationRecord
  validates :display_name, :description, presence: true

  belongs_to :user
  belongs_to :course
end