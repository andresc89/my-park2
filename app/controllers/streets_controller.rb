class StreetsController < ApplicationController

  def new

  end

  def index
    @streets = Street.all
    # The `geocoded` scope filters only flats with coordinates
    @markers = @streets.geocoded.map do |street|
      {
        lat: street.latitude,
        lng: street.longitude,
        info_window: render_to_string(partial: "info_window", locals: {street: street})
      }
    end
  end
