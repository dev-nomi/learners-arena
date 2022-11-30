class CreateCoupon < ActiveRecord::Migration[6.1]
  def change
    create_table :coupons do |t|
      t.string     :coupon_id
      t.string     :coupon_name
      t.integer    :price_off

      t.timestamps
    end
  end
end
