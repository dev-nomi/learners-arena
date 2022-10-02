class CourseSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :image

  def image
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
    end
  end
end
