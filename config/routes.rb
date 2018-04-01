Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/:name', to: 'categories#show', as: 'category'

  root to: 'pages#home'
end
