class HandoutSerializer < ActiveModel::Serializer
  attributes :id, :display_name, :description, :pdf, :week_no
  belongs_to :course

  def pdf
    if object.pdf.attached?
      Rails.application.routes.url_helpers.rails_blob_path(object.pdf, only_path: true)
    end
  end
end
