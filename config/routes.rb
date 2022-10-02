Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :courses
    end
  end

  get '*path', to: 'pages#home', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
