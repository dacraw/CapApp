Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :news, only: [:index, :show]
    resources :users, only: [:create] do
      resources :portfolios, param: :symbol, only: [:index, :update]
    end
    resources :stocks, param: :symbol, only: [:show, :index]
    resource :session, only: [:create, :destroy]
    resources :portfolios, only: [:create]
    resources :user_stocks, only: [:index, :create]
  end

  root to: 'static_pages#root'
end
