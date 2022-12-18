class Coupon < ApplicationRecord

  def display_price
    price = self.price_off.to_s
    price.slice(0, price.length - 2) || 0
  end
end