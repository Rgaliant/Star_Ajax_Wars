namespace :populate do
  desc "Populate Planets"
  task planets: :environment do
    20.times do
      planet = Planet.create(name: Faker::Movies::StarWars.planet, description: Faker::Movies::StarWars.wookiee_sentence)
      20.times { Citizen.create(name: Faker::Movies::StarWars.character, saying: Faker::Movies::StarWars.quote, specie: Faker::Movies::StarWars.specie, planet_id: planet.id) }
  end
 end
end
