class Api::V1::VideosController < ApplicationController
  def index
    @videos = current_user.videos.with_attached_file.order(created_at: :desc)
    render json: @videos
  end

  def show
    @video = Video.with_attached_file.find_by_id(params[:id])
    render json: @video
  end

  def create
    @video = Video.new(video_params)
    @video.user = current_user

    if @video.save
      render json: @video   
    else
      render json: @video.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @video = Video.find_by_id(params[:id])

    if @video.update(video_params)
      render json: @video
    else
      render json: { message: 'Cannot update the video.' }
    end
  end

  def destroy
    @video = Video.find_by_id(params[:id])
    @video.destroy
    render json: { message: 'Successfully delete the video.' }
  end

  def view
    @video = Video.find_by_id(params[:id])
    user_video = @video.user_videos.build(viewed: true, user: current_user)
    user_video.save!
    render json: { message: 'Successfully complete the video.' }
  end

  private
    def video_params
      params.require(:video).permit(:display_name, :description, :file, :week_no, :course_id).select {|x,v| v.present?}
    end
end