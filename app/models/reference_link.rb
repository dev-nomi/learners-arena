class ReferenceLink < ApplicationRecord
  validates :display_name, :description, :url, :week_no, presence: true
end