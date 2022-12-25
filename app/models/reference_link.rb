class ReferenceLink < ApplicationRecord
  validates :display_name, :description, :url, :week_no, presence: true

  validates_format_of :display_name, :description, :url, with: /\A[A-Za-z]/, message: "can't start with digit"
  belongs_to :user
  belongs_to :course
end