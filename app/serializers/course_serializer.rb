class CourseSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :image, :enroll_courses_count

  def image
    if object.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.image, only_path: true)
    end
  end

  def enroll_courses_count
    object.enrolled_courses.count
  end
end
