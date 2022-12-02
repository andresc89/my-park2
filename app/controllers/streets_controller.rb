require 'json'
class StreetsController < ApplicationController

  def new
    @street = Street.new
    # @streetbike = Street.new
  end

  def index
    @streets = Street.all
    # The `geocoded` scope filters only flats with coordinates
    @markers = @streets.geocoded.map do |street|
      {
        lat: street.latitude,
        lng: street.longitude,
        # info_window: render_to_string(partial: "info_window", locals: { street: street }),
        image_url: helpers.asset_url("logowhite.png")
      }
    end
    # @streetbike = Street.all
    # @streetbike = @streetbike.geocoded.map do |street|
    #   {
    #     lat: street.latitude,
    #     lng: street.longitude,
    #     info_window: render_to_string(partial: "info_window", locals: { street: street }),
    #     image_url: helpers.asset_url("logobike.png")
    #   }
    # end
  end
end
