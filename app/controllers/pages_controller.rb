class PagesController < ApplicationController
  def home
  end
  
  def index
    @courses = Course.all.with_attached_image.includes(:students, :handouts, :quizzes, :user, :assignments, :videos, :reference_links)
    render json: @courses 
  end

  def students
    @students = User.students
    render json: @students
  end

  def teachers
    @teachers = User.teachers
    render json: @teachers
  end

  def checkout
    Stripe.api_key = 'sk_test_51M8k8uDrsSBJWVANctSn2Y0S9F9hA3kKA5JkmWXBMg1wNJH2401sk2ELFaOL2jaugVhJHpjxfyMkIigBa0J3y0vK00LFfO9YDr'

    session_hash = {
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1M9pVIDrsSBJWVANZ7NQSpSi',
        quantity: 1,
      }],
      mode: 'payment',
      success_url: "#{request.base_url}/checkout_success",
      cancel_url: "#{request.base_url}/checkout_cancel",
    }

    session_hash.merge!(discounts: [{
      coupon: 'qWG6oHcx',
    }]) if true

    session = Stripe::Checkout::Session.create(session_hash)

    render json: { url: session.url }
  end
end
