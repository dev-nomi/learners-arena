class AddPriceIdToPaymentPlan < ActiveRecord::Migration[6.1]
  def change
    add_column :payment_plans, :price_id, :string
  end
end
