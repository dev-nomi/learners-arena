module StripeServices
  class Coupon

    def initialize
      Stripe.api_key = 'sk_test_51M8k8uDrsSBJWVANctSn2Y0S9F9hA3kKA5JkmWXBMg1wNJH2401sk2ELFaOL2jaugVhJHpjxfyMkIigBa0J3y0vK00LFfO9YDr'
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