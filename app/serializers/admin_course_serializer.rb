class AdminCourseSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :draft, :teacher

  def teacher
    object.user
  end
end
