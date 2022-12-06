class CountersController < ApplicationController
  def create
    @counter = Counter.new
    @counter.street = Street.find(params[:street_id])
    @counter.save
    current_user.update!(carlongitude: params[:lng], carlatitude: params[:lat])
    respond_to do |format|
      format.json # seguir o Rails Flow (routes -> controller -> view) -> "counters/create.json.jbuilder"
    end
  end

  # private

  # def counter_params
  #   params.require(:counter).permit()
  # end
end
