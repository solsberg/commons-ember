class UsersController < ApplicationController
  before_action :authenticate

  def index
    users = User.all
    users = users.uid(params[:uid]) if params[:uid].present?
    render json: users
  end
end
