class AddPaymentPlanToCourse < ActiveRecord::Migration[6.1]
  def change
    add_reference :courses, :payment_plan, foreign_key: true
    add_column :courses, :bought, :boolean, default: false
  end
end
