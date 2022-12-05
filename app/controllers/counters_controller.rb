class CountersController < ApplicationController
  def create
    @counter = Counter.new
    @counter.street = Street.find(params[:street_id])
    @counter.save
    flash[:notice] = "Thank you for parking with us :)"
    redirect_to streets_path
  end

  # private

  # def counter_params
  #   params.require(:counter).permit()
  # end
end
