Rails.application.routes.draw do
  namespace :admin do
    resources :garments, only: [:index, :new, :create, :edit, :update, :destroy]
    resources :orders, only: [:index, :show]
  end

  get 'label', to: 'pages#label', as: :label
  get 'contact', to: 'pages#contact', as: :contact

  # cart
  get 'cart', to: 'pages#cart', as: :cart
  # checkout / address
  get 'checkout', to: 'addresses#new', as: :checkout
  post 'checkout', to: 'addresses#create'
  # payment
  get 'pay', to: 'charges#new', as: :payment
  post 'pay', to: 'charges#create'
  get 'ideal', to: 'charges#ideal', as: :ideal_callback
  # post-order screen
  get 'finished', to: 'pages#finished', as: :finished

  get 'facade_api', to: 'pages#facade_api'
  get 'login', to: 'pages#login'

  get '/:name', to: 'categories#show', as: :category
  get '/:category_name/:slug', to: 'garments#show', as: :garment
  post '/garments/:slug/add', to: 'garments#add', as: :add_garment

  root to: 'pages#home'
end
