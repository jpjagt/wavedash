Rails.application.routes.draw do
  get 'checkout', to: 'addresses#new'
  post 'checkout', to: 'addresses#create'

  get 'pay', to: 'charges#new'
  post 'pay', to: 'charges#create'

  get 'cart', to: 'pages#cart', as: 'cart'
  get 'contact', to: 'pages#contact', as: 'contact'

  get '/:name', to: 'categories#show', as: 'category'
  get '/:category_name/:slug', to: 'garments#show', as: 'garment'
  post '/garments/:slug/add', to: 'garments#add', as: 'add_garment'

  root to: 'pages#home'
end
