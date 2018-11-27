Rails.application.routes.draw do
  get 'cart', to: 'pages#cart', as: 'cart'
  get 'contact', to: 'pages#contact', as: 'contact'

  get 'facade_api', to: 'pages#facade_api'

  get '/:name', to: 'categories#show', as: 'category'
  get '/:category_name/:slug', to: 'garments#show', as: 'garment'
  post '/garments/:slug/add', to: 'garments#add', as: 'add_garment'

  root to: 'pages#facade'
end
