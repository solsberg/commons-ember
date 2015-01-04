class ProfileResponsesController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def show
    response = ProfileResponse.find(params[:id])
    render json: response
  end
end
