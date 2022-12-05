class CountersController < ApplicationController
  def create
    @counter = Counter.new
    @counter.street = Street.find(params[:street_id])
    @parking_occupation = 50
    @counter.save
    current_user.update!(carlatitude: params[:lat], carlongitude: params[:lng])
    flash[:notice] = "Thank you for parking with us :)"
  end

  # private

  # def counter_params
  #   params.require(:counter).permit()
  # end
end
