include ActionView::Helpers::DateHelper

class ResponseSerializer < ActiveModel::Serializer
  attributes :id, :title, :resp_type, :submitted_at

  belongs_to :user

  def submitted_at
    "#{time_ago_in_words(object.created_at)} ago"
  end
end
