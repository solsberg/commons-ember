class NewsitemsController < ApplicationController
  before_action :authenticate
  
  def index
    render json: Newsitem.all
  end

  def create
    new_item = Newsitem.create newsitem_params
    render json: new_item
  end

  private

  def newsitem_params
    params.require(:newsitem).permit(:content, :user_id)
  end
end
