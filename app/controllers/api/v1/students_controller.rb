class Api::V1::StudentsController < ApplicationController
  def show
    @student = User.find_by_id(params[:id])
    render json: @student
  end
end