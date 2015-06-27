class ProfileQuestionsController < ApplicationController
  # before_action :authenticate_user!

  def index
    questions = ProfileQuestion.all
    render json: questions
  end

  def create
    new_item = ProfileQuestion.create question_params
    render json: new_item
  end

  def update
    question = ProfileQuestion.find(params[:id])
    question.update!(question_params)
    render json: question
  end

  def destroy
    question = ProfileQuestion.find(params[:id])
    question.destroy
    render json: {}
  end

  private

  def question_params
    params.require(:profile_question).permit(:text, :description, :type, :order, :section_id)
  end
end
