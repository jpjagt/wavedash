Rails.application.routes.draw do
  get 'label', to: 'pages#label', as: :label
  get 'contact', to: 'pages#contact', as: :contact

  # checkout
  get 'cart', to: 'pages#cart', as: :cart
  get 'checkout', to: 'addresses#new', as: :checkout
  post 'checkout', to: 'addresses#create'

  get 'facade_api', to: 'pages#facade_api'

  get '/:name', to: 'categories#show', as: 'category'
  get '/:category_name/:slug', to: 'garments#show', as: 'garment'
  post '/garments/:slug/add', to: 'garments#add', as: 'add_garment'

  root to: 'pages#home'
end
