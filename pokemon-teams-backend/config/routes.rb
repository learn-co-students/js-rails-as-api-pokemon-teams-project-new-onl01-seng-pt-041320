Rails.application.routes.draw do
  resources :trainers, only: [:index]
  resources :pokemons, only: [:index, :create, :delete]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
