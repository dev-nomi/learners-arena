class Response < ApplicationRecord
  validates :title, presence: true, uniqueness: { case_sensitive: false }
  enum resp_type: [:complain, :feedback, :query]

  belongs_to :user
end