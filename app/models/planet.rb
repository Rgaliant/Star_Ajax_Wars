class Planet < ApplicationRecord
  has_many :citizens

  validates_presence_of :name
end
