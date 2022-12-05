require 'json'
class StreetsController < ApplicationController

  def new
    @street = Street.new
    # @streetbike = Street.new
  end

  def index
    @streets = Street.all
    @counter = Counter.new
    @markers = @streets.geocoded.map do |street|
      {
        lat: street.latitude,
        lng: street.longitude,
        info_window: render_to_string(partial: "info_window", locals: { street: street }),
        image_url: helpers.asset_url("logowhite.png"),
        counter_btn: render_to_string(partial: "shared/counter_btn", locals: { street: street, counter: @counter })
      }
    end
  end

  # def update
  #   @street = Street.find(params[:id])
  #   @counter = Counter.new
  #   @street.availability = 50
  #   if @counter.save
  #     @street.availability += 5
  #   end
  # end


  private

  def street_params
    params.require(:street).permit([:address, :availability])
  end
end
  # def park
  #   @counter = Counter.new
  #   @street = Street.find(params[:street_id])
  #   @street.availability += 10
  #   @counter.save
  # end
  # @streetbike = Street.all
  # @streetbike = @streetbike.geocoded.map do |street|
  #   {
  #     lat: street.latitude,
  #     lng: street.longitude,
  #     info_window: render_to_string(partial: "info_window", locals: { street: street }),
  #     image_url: helpers.asset_url("logobike.png")
  #   }
  # end
