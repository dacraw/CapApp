Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      resources :portfolios, only: [:index]
    end
    resources :stocks, param: :symbol, only: [:show, :index]
    resource :session, only: [:create, :destroy]
    resources :portfolios, only: [:create]
  end

  root to: 'static_pages#root'
end
