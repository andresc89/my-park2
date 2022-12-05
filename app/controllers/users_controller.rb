class UsersController < ApplicationController
  def profile
    @user = current_user
  end

  # def edit
  #   @user = current_user
  #   render "registrations/edit"
  #   authorize @user
  # end

  def update
    @user = User.find(user_params)
    @user.update(user_params)
    redirect_to profile_path(@user)
  end

  # def park
  #   @carlatitude
  #   @carlongitude
  # end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :photo)
  end
end
