class AuthController < ApplicationController
  def sign_in
    return head :unauthorized unless params[:user_id] == user_id_from_token

    user = User.find_by(uid: params[:user_id])
    if user.nil?
      user = User.create auth_params.merge({:provider => "auth0"})
    end

    render json: user
  end

private
  def user_id_from_token
    token_string = request.headers['Authorization'].split.last
    # puts "token: " + token
    token = Knock::AuthToken.new(token: token_string)
    payload = token.instance_variable_get("@payload")
    # puts "payload: " + payload.to_s
    payload['sub']
  end

  def auth_params
    values = params.permit(:user_id, :username, :email, :picture)
    values[:uid] = values.delete :user_id
    values[:image] = values.delete :picture
    values
  end
end
