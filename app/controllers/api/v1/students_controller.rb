class Api::V1::StudentsController < ApplicationController
  def show
    @student = User.find_by_id(params[:id])
    render json: @student
  end

  def destroy
    @student = User.find_by_id(params[:id])
    @student.destroy

    render json: { message: 'Successully delete the student.' }    
  end
end