class PokemonsController < ApplicationController

  def index
    pokemons = Pokemon.all
    render json: pokemons
  end

  def show
    pokemon = Pokemon.find_by(params[:id])
    render json: pokemon
  end

  def create
    trainer = Trainer.find(params[:trainer_id])
    pokemon = trainer.pokemons.create({
      nickname: Faker::Name.first_name, 
      species: Faker::Games::Pokemon.name
    })
    if pokemon.save 
      render json: pokemon
    else
      render json: {message: pokemon.errors.messages[:team_max][0]}
    end
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
  end
end
