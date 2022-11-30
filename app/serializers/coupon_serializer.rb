class CouponSerializer < ActiveModel::Serializer
  attributes :id, :coupon_name, :coupon_id, :price_off

  def price_off
    price = object.price_off.to_s
    price.slice(0, price.length - 2) || 0
  end
end
