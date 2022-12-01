class PagesController < ApplicationController
  def home
  end
  
  def index
    @courses = Course.published.with_attached_image.includes(:students, :handouts, :quizzes, :user, :assignments, :videos, :reference_links)
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
    course = Course.find_by_id(params[:course_id])

    Stripe.api_key = 'sk_test_51M8k8uDrsSBJWVANctSn2Y0S9F9hA3kKA5JkmWXBMg1wNJH2401sk2ELFaOL2jaugVhJHpjxfyMkIigBa0J3y0vK00LFfO9YDr'

    price_id = Stripe::Product.retrieve(course.payment_id)

    session_hash = {
      payment_method_types: ['card'],
      line_items: [{
        price: price_id[:default_price],
        quantity: 1,
      }],
      mode: 'payment',
      success_url: "#{request.base_url}/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "#{request.base_url}/checkout_cancel",
      metadata: {
        course_id: course.id
      },
    }

    session_hash.merge!(discounts: [{
      coupon: params[:coupon_code],
    }]) if params[:coupon_code].present?

    session = Stripe::Checkout::Session.create(session_hash)

    render json: { url: session.url, session_id: session.id }
  end

  def success
    Stripe.api_key = 'sk_test_51M8k8uDrsSBJWVANctSn2Y0S9F9hA3kKA5JkmWXBMg1wNJH2401sk2ELFaOL2jaugVhJHpjxfyMkIigBa0J3y0vK00LFfO9YDr'

    session = Stripe::Checkout::Session.retrieve(
      params[:session_id],
    )

    course = Course.find_by_id(session[:metadata][:course_id].to_i)
    course.update(bought: true)

    redirect_to "#{request.base_url}/checkout_success"
  end
end
