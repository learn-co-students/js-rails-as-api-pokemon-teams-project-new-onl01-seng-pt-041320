class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  attribute :pokemons do |pokemon|
    species = Pokemon.where(trainer_id: pokemon.id)
    pokemons = {}
    species.each do |pokemon|
      pokemons[:id] = pokemon.id
      pokemons[:nickname] = pokemon.nickname
      pokemons[:species] = pokemon.species
    end
  end
end
