Rails.application.routes.draw do
  root to: 'pages#home'
  devise_for :users

  get '*path', to: 'pages#home', via: :all
end
