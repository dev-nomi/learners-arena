class Api::V1::TeachersController < ApplicationController
  def toggle_active
    @teacher = User.find_by_id(params[:teacher_id])
    @teacher.update(active: !@teacher.active)

    render json: { status: @teacher.active }    
  end
end