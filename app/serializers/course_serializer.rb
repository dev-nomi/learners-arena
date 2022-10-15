class CourseSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :image, :level, :total_hours, :outline

  has_many :handouts
  has_many :users
  has_many :quizzes
  
  def image
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
    end
  end
end
