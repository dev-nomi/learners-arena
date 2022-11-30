module StripeServices
  class PaymentPlan

    def initialize
      Stripe.api_key = 'sk_test_51M8k8uDrsSBJWVANctSn2Y0S9F9hA3kKA5JkmWXBMg1wNJH2401sk2ELFaOL2jaugVhJHpjxfyMkIigBa0J3y0vK00LFfO9YDr'
    end

    def add(name, price)
      price = "#{price}00".to_i

      s_product = Stripe::Product.create({
        name: name,
        default_price_data: {
          currency: "pkr",
          unit_amount_decimal: price,
        },
        expand: ['default_price']
      })

      {
        payment_id: s_product[:id],
        payment_name: s_product[:name],
        payment_price: s_product[:default_price][:unit_amount]
        price_id: s_product[:default_price][:id]
      }
    end
  end
end