class Api::V1::PaymentPlansController < ApplicationController
  def index
    @payment_plans = PaymentPlan.all
    render json: @payment_plans
  end 

  def create
    payment_hash = StripeServices::PaymentPlan.new.add(
                                                payment_plan_params[:name],
                                                payment_plan_params[:price])
    @payment_plans = PaymentPlan.new(payment_hash)

    if @payment_plans.save
      render json: @payment_plans
    else
      render json: @payment_plans.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @payment_plan = PaymentPlan.find_by_id(params[:id])

    StripeServices::PaymentPlan.new.delete(@payment_plan.payment_id)
    @payment_plan.destroy

    render json: { message: 'Successfully delete the payment plan.' }
  end

  private

  def payment_plan_params
    params.require(:payment_plan).permit(:name, :price)  
  end
end