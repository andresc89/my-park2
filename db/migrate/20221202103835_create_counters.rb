class CreateCounters < ActiveRecord::Migration[7.0]
  def change
    create_table :counters do |t|
      t.references :street, null: false, foreign_key: true

      t.timestamps
    end
  end
end
