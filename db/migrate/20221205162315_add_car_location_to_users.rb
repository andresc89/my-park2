class AddCarLocationToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :carlatitude, :float
    add_column :users, :carlongitude, :float
  end
end
