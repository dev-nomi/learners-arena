class ReferenceLink < ApplicationRecord
  validates :display_name, :description, :url, :week_no, presence: true

  belongs_to :user
  belongs_to :course
end