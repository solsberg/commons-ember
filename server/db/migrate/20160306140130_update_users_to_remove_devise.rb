class UpdateUsersToRemoveDevise < ActiveRecord::Migration
  def change
    change_column_null(:users, :encrypted_password, true)
    change_column_null(:users, :sign_in_count, true)
  end
end
