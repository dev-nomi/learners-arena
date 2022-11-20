class UserAssignment < ApplicationRecord
  validates :assignment, uniqueness: { scope: :user }
  serialize :ans_keys, Array

  delegate :course, to: :assignment

  belongs_to :user
  belongs_to :assignment

  enum status: [:in_progress, :checked]
end