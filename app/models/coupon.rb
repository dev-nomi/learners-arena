class Coupon < ApplicationRecord
  validates :coupon_name, presence: true, uniqueness: { case_sensitive: false }
  validates_format_of :coupon_name, with: /\A[A-Za-z]/, message: "can't start with digit"

  def display_price
    price = self.price_off.to_s
    price.slice(0, price.length - 2) || 0
  end
end