class Response < ApplicationRecord
  enum resp_type: [:complain, :feedback, :query]

  belongs_to :user
end