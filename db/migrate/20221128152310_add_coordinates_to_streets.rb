class AddCoordinatesToStreets < ActiveRecord::Migration[7.0]
  def change
    add_column :streets, :latitude, :float
    add_column :streets, :longitude, :float
  end
end
