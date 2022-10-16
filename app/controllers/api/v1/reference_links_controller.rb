class Api::V1::ReferenceLinksController < ApplicationController
  respond_to :json

  def index
    @reference_links = current_user.reference_links.all.order(created_at: :desc)
    render json: @reference_links
  end

  def show
    @reference_link = ReferenceLink.find_by_id(params[:id])
    render json: @reference_link
  end

  def create
    @reference_link = ReferenceLink.new(reference_link_params)
    @reference_link.user = current_user

    if @reference_link.save
      render json: @reference_link   
    else
      render json: @reference_link.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @reference_link = ReferenceLink.find_by_id(params[:id])

    if @reference_link.update(reference_link_params)
      render json: @reference_link
    else
      render json: { message: 'Cannot update the reference link.' }
    end
  end

  def destroy
    @reference_link = ReferenceLink.find_by_id(params[:id])
    @reference_link.destroy
    render json: { message: 'Successfully delete the reference link.' }
  end

  private
    def reference_link_params
      params.require(:reference_link).permit(:display_name, :description, :url, :week_no, :course_id)
    end
end