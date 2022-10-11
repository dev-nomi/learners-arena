class Api::V1::HandoutsController < ApplicationController
  respond_to :json
  def index
    @handouts = current_user.handouts.with_attached_pdf.all.order(created_at: :desc)
    render json: @handouts 
  end

  def show
    @handout = Handout.with_attached_pdf.find_by_id(params[:id])
    render json: @handout
  end

  def create
    @handout = Handout.new(handout_params)
    @handout.user = current_user
    
    if @handout.save
      render json: @handout   
    else
      render json: @handout.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @handout = Handout.find_by_id(params[:id])

    if @handout.update(handout_params)
      render json: @handout
    else
      render json: { message: 'Cannot update the handout.' }
    end
  end

  def destroy
    @handout = Handout.find_by_id(params[:id])
    @handout.destroy
    render json: { message: 'Successfully delete the handout.' }
  end

  private
    def handout_params
      params.require(:handout).permit(:display_name, :description, :pdf, :course_id).select {|x,v| v.present?}
    end
end
