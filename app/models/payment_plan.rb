class PaymentPlan < ApplicationRecord
  validates :payment_name, presence: true, uniqueness: { case_sensitive: false }
  validates_format_of :payment_name, with: /\A[A-Za-z]/, message: "can't start with digit"

  has_many :courses
end