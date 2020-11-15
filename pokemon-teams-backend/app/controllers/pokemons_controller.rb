class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def new
    end

    def create
        trainer = Trainer.find_by_id(params[:trainer_id])
        trainers = Trainer.all
        if trainer.pokemons.length < 6
            capture = trainer.pokemons.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
        end
        render json: PokemonSerializer.new(capture)
    end

    def show
        pokemon = Pokemon.find(params[:id])
        options = {
            include: [:trainer]
        }
        render json: PokemonSerializer.new(pokemon, options)
    end

    def destroy
        trainer = Trainer.find_by_id(params[:trainer_id])
        pokemon = trainer.pokemons.find_by_id(params[:id])
        pokemon.destroy
        render json: PokemonSerializer.new(pokemon)
    end


    private

    def trainer_params
        params.require(:pokemons).permit(:trainer_id)
    end
end