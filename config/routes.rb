Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :streets, only: [:index] do
    resources :counters, only: [:create]
  end
  # Defines the root path route ("/")
  # root "articles#index"
  resources :users, only: [] do
    collection do
      get :profile
    end
  end
end
