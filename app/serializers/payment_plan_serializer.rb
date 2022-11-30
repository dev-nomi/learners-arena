class PaymentPlanSerializer < ActiveModel::Serializer
  attributes :id, :payment_name, :payment_price

  def payment_price
    price = object.payment_price.to_s
    price.slice(0, price.length - 2) || 0
  end
end
