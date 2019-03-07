class CitizensController < ApplicationController
  before_action :set_planet, only: [:index, :create]
  before_action :set_citizen, only: [:show, :update, :destroy]

  def index
    render json: @planet.citizens
  end

  def show
    render json: @citizen
  end

  def create
    @citizen = @planet.citizens.new(citizen_params)

    if @citizen.save
      render json: @citizen
    else
      render_error(@citizen)
    end
  end

  def update
    if @citizen.update(citizen_params)
      render json: @citizen
    else
      render_error(@citizen)
    end
  end

  def destroy
    @citizen.destroy
    render json: { message: 'removed' }, status: :ok
  end

private
  def set_planet
    @planet = Planet.find(params[:planet_id])
  end

  def set_citizen
    @citizen = @planet.citizen.find(params[:id])
  end

  def citizen_params
    params.require(:citizen).permit(:name, :saying, :specie)
  end

end
