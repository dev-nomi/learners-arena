class CourseSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :image, :level, :total_hours, :outline, :total_weeks

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
end
