class PagesController < ApplicationController
  def home
  end
  
  def index
    @published = Course.published.with_attached_image.includes(:students, :handouts, :quizzes, :user, :assignments, :videos, :reference_links)
    @courses = Course.with_attached_image.includes(:students, :handouts, :quizzes, :user, :assignments, :videos, :reference_links)
    render json: { 
      courses: ActiveModel::Serializer::CollectionSerializer.new(@courses, serializer: AdminCourseSerializer), 
      published_courses: @published 
    }
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

    Stripe.api_key = 'sk_test_51MFzU3B9k6jfn1J6vhnbKnfQYTgYjIZnRuRhuIjtwaOTldEEmDFz6bgA9NnIDMtnWFYEh69EcXh6gNnle7Lxwg7N000GTgjwoK'

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
    Stripe.api_key = 'sk_test_51MFzU3B9k6jfn1J6vhnbKnfQYTgYjIZnRuRhuIjtwaOTldEEmDFz6bgA9NnIDMtnWFYEh69EcXh6gNnle7Lxwg7N000GTgjwoK'

    session = Stripe::Checkout::Session.retrieve(
      params[:session_id],
    )

    course = Course.find_by_id(session[:metadata][:course_id].to_i)
    course.student_payments.create(user_id: current_user.id, bought: true)

    redirect_to "#{request.base_url}/checkout_success"
  end

  def send_coupons
    CouponMailer.send_coupon(params[:coupon_code]).deliver_later
  end

  def show_user
    @user =  User.find_by(email: params[:sender])

    if @user.active?
      render json: { status: 'Your are currently active.' }, status: :ok
    else
      render json: { status: 'Your are currently disable by admin.' }, status: :unprocessable_entity
    end
  end
end
