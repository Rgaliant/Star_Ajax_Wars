class CreateCitizens < ActiveRecord::Migration[5.2]
  def change
    create_table :citizens do |t|
      t.string :name
      t.string :saying
      t.string :specie
      t.belongs_to :planet, foreign_key: true

      t.timestamps
    end
  end
end
