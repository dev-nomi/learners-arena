Rails.application.routes.draw do
  root to: 'pages#home'
  
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  
  get '/member-data', to: 'members#show'
  get '/all_courses', to: 'pages#index'
  get '/all_teachers', to: 'pages#teachers'
  get '/all_students', to: 'pages#students'
  post '/checkout', to: 'pages#checkout'
  post '/send_coupons', to: 'pages#send_coupons'
  get '/success', to: 'pages#success'
  get '/show_user/:sender', to: 'pages#show_user', constraints: { sender: /[^\/]+/}
  get '/admin/courses', to: 'pages#admin_all_courses'

  namespace :api do
    namespace :v1 do
      resources :courses do
        member do
          post 'publish'
          post 'toggle_publish'
        end
      end
      resources :handouts
      resources :enrolled_courses, only: [:index] do
        collection do
          post 'enroll'
        end
      end
      resources :quizzes
      resources :reference_links
      resources :videos do
        collection do
          post 'view'
        end
      end
      resources :assignments
      resources :user_quizzes, only: [:index] do
        collection do
          post 'attempt'
          post 'submit'
        end
      end
      resources :user_assignments, only: [:show, :index] do
        collection do
          post 'attempt'
          post 'submit'
          post 'check'
        end
      end
      resources :teachers, only: [:destroy] do 
        post 'toggle_active'
      end
      resources :students, only: [:show, :update] do
        post 'toggle_active'
      end
      resources :responses
      resources :payment_plans
      resources :coupons
    end
  end

  get '*path', to: 'pages#home', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
