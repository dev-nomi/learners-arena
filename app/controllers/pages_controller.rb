class PagesController < ApplicationController
  def home
  end
  
  def index
    @courses = Course.all.with_attached_image
    render json: @courses 
  end
end
