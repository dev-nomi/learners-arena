Rails.application.routes.draw do
  root to: 'pages#home'
  
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  
  get '/member-data', to: 'members#show'
  get '/all_courses', to: 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :courses
      resources :handouts
      resources :enrolled_courses, only: [:index] do
        collection do
          post 'enroll'
        end
      end
      resources :quizzes
      resources :reference_links
    end
  end

  get '*path', to: 'pages#home', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
