class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all

        render json: pokemons, except: [:created_at, :updated_at]
    end

    def create
        render json: faker_create_pokemon, except: [:created_at, :updated_at]
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])

        pokemon.destroy
    end

    private

    def faker_create_pokemon
        nickname = Faker::Name.first_name
        species = Faker::Games::Pokemon.name

        Pokemon.create(nickname: nickname, species: species, trainer_id: params[:trainer_id])
    end
end
