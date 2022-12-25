class Api::V1::StudentsController < ApplicationController
  def show
    @student = User.find_by_id(params[:id])
    render json: @student
  end

  def toggle_active
    @student = User.find_by_id(params[:student_id])
    @student.update(active: !@student.active)

    render json: { status: @student.active }    
  end
end