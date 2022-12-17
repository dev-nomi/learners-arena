module StripeServices
  class PaymentPlan

    def initialize
      Stripe.api_key = 'sk_test_51MFzU3B9k6jfn1J6vhnbKnfQYTgYjIZnRuRhuIjtwaOTldEEmDFz6bgA9NnIDMtnWFYEh69EcXh6gNnle7Lxwg7N000GTgjwoK'
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
        payment_price: s_product[:default_price][:unit_amount],
        price_id: s_product[:default_price][:id]
      }
    end
  end
end