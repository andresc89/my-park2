class CountersController < ApplicationController
  def create
    @counter = Counter.new
    @counter.street = Street.find(params[:street_id])
    @counter.save
    current_user.update!(carlatitude: params[:lat], carlongitude: params[:lng])
  end

  # private

  # def counter_params
  #   params.require(:counter).permit()
  # end
end
