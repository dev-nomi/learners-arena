class VideoSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :file, :week_no
  belongs_to :course

  def file
    if object.file.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.file, only_path: true)
    end
  end
end
