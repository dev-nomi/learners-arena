class PagesController < ApplicationController
  def home
  end
  
  def index
    @courses = Course.all.with_attached_image.includes(:users, :handouts, :quizzes, :user, :assignments, :videos, :reference_links)
    render json: @courses 
  end
end
