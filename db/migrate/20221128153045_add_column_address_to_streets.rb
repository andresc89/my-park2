class AddColumnAddressToStreets < ActiveRecord::Migration[7.0]
  def change
    add_column :streets, :address, :string
  end
end
