class Api::V1::CouponsController < ApplicationController
  def index
    @coupons = Coupon.all
    render json: @coupons
  end 

  def create
    coupon_hash = StripeServices::Coupon.new.add(
                                                coupon_params[:name],
                                                coupon_params[:price_off])
    @coupon = Coupon.new(coupon_hash)

    if @coupon.save
      render json: @coupon
    else
      render json: @coupon.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def coupon_params
    params.require(:coupon).permit(:name, :price_off)  
  end
end