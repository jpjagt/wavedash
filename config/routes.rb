Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'cart', to: 'pages#cart', as: 'cart'

  get '/:name', to: 'categories#show', as: 'category'
  get '/:category_name/:path', to: 'garments#show', as: 'garment'

  root to: 'pages#home'
end
