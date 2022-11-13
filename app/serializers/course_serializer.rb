class CourseSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :image, :level, :total_hours, :outline, :total_weeks, :draft, :enrolled_course

  has_many :handouts
  has_many :users
  has_many :quizzes
  has_many :reference_links
  has_many :videos
  has_many :assignments

  def image
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
    end
  end

  def enrolled_course
    object.enrolled_courses.where(course_id: object.id, user_id: current_user.id).
                            select(:id, :progress).first
  end
end
