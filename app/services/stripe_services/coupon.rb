module StripeServices
  class Coupon

    def initialize
      Stripe.api_key = 'sk_test_51MFzU3B9k6jfn1J6vhnbKnfQYTgYjIZnRuRhuIjtwaOTldEEmDFz6bgA9NnIDMtnWFYEh69EcXh6gNnle7Lxwg7N000GTgjwoK'
    end

    def add(name, price_off)
      price_off = "#{price_off}00".to_i

      s_coupon = Stripe::Coupon.create({
        name: name,
        amount_off: price_off,
        duration: 'forever',
        currency: 'pkr'
      })
      
      {
        coupon_id: s_coupon[:id],
        coupon_name: s_coupon[:name],
        price_off: s_coupon[:amount_off]
      }
    end
  end
end