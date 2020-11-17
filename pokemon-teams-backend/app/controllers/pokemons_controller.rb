class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons, only: [:id, :nickname, :species, :trainer_id]
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        redirect_to root_path
    end

    def new

    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        trainer = Trainer.find_by(id: params[:trainer_id])
        if trainer.pokemons.length < 6
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: pokemon
        end
    end

end
