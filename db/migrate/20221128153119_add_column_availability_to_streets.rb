class AddColumnAvailabilityToStreets < ActiveRecord::Migration[7.0]
  def change
    add_column :streets, :availability, :float
  end
end
