class ProfileResponsesController < ApplicationController
  before_action :authenticate_user!

  def index
    user = User.find(params[:user_id])
    render json: user.profile_responses
  end

  def show
    response = ProfileResponse.find(params[:id])
    render json: response
  end

  def create
    new_item = ProfileResponse.create response_params
    render json: new_item
  end

  def update
    response = ProfileResponse.find(params[:id])
    response.update!(response_params)
    render json: response
  end

  def destroy
    response = ProfileResponse.find(params[:id])
    response.destroy
    render json: {}
  end

  private

  def response_params
    params.require(:profile_response).permit(:text, :question_id, :user_id)
  end
end
