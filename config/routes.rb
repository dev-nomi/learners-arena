Rails.application.routes.draw do
  root to: 'pages#home'
  
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  get '/member-data', to: 'members#show'

  namespace :api do
    namespace :v1 do
      resources :courses
      resources :handouts
    end
  end

  get '*path', to: 'pages#home', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
