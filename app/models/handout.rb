class Handout < ApplicationRecord
  validates :display_name, :description, :week_no, presence: true
  validates :pdf, {
    presence: true
  }
  validates_format_of :display_name, :description, with: /\A[A-Za-z]/, message: "can't start with digit" 

  has_one_attached :pdf, dependent: :purge
  belongs_to :course
  belongs_to :user
end