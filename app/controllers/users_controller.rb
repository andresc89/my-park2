class UsersController < ApplicationController
  def show
    @user = current_user
  end

  # def edit
  #   @user = current_user
  #   render "registrations/edit"
  #   authorize @user
  # end

  def update
  end
end
