class CountersController < ApplicationController
  def create
    @counter = Counter.new
    @counter.street = Street.find(params[:street_id])
    @parking_occupation = 50
    @counter.save
    @parking_occupation += Street.find(params[:street_id]).counters.count
    flash[:notice] = "Thank you for parking with us :)"
    # redirect_to streets_path
  end

  # private

  # def counter_params
  #   params.require(:counter).permit()
  # end
end
