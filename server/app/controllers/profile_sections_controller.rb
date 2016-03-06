class ProfileSectionsController < ApplicationController
  before_action :authenticate

  def index
    sections = ProfileSection.all
    render json: sections
  end

  def create
    new_item = ProfileSection.create section_params
    render json: new_item
  end

  def update
    section = ProfileSection.find(params[:id])
    section.update!(section_params)
    render json: section
  end

  def destroy
    section = ProfileSection.find(params[:id])
    section.destroy
    render json: {}
  end

  private

  def section_params
    params.require(:profile_section).permit(:title, :order)
  end
end
