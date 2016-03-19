class UsersController < ApplicationController
  before_action :authenticate

  def index
    users = User.all
    users = users.uid(params[:uid]) if params[:uid].present?
    render json: users
  end

  def update
    user = User.find(params[:id])
    user.update!(user_params)
    render json: user
  end

  private

  def user_params
    params.require(:user).permit(:fullname)
  end
end
