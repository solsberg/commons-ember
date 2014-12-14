class UsersController < ApplicationController
  def index
    users = User.all
    users = users.uid(params[:uid]) if params[:uid].present?
    render json: users
  end
end
