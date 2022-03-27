Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  resources :comments
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root 'comments#index'

  get '/simple', to: 'pages#simple'

  # Defines the root path route ("/")
  # root "articles#index"
end
