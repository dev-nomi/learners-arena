class Api::V1::ResponsesController < ApplicationController
  def index
    @responses = Response.all 
    render json: @responses
  end

  def create
    @response = Response.new(response_params)
    @response.user_id = current_user.id

    if @response.save
      render json: @response
    else
      render json: @response.errors.full_messages, status: :unprocessable_entity
    end
  
  end

  private

  def response_params
    params.require(:response).permit(:title, :resp_type)  
  end
end