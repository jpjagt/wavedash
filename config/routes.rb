Rails.application.routes.draw do
  get 'cart', to: 'pages#cart', as: 'cart'
  get 'contact', to: 'pages#contact', as: 'contact'

  get '/:name', to: 'categories#show', as: 'category'
  get '/:category_name/:path', to: 'garments#show', as: 'garment'

  root to: 'pages#home'
end
