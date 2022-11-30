class CreatePaymentPlan < ActiveRecord::Migration[6.1]
  def change
    create_table :payment_plans do |t|
      t.string     :payment_id
      t.string     :payment_name
      t.integer    :payment_price

      t.timestamps
    end
  end
end
