import { Controller } from "@hotwired/stimulus"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"

export default class extends Controller {
  static values = {
    apiKey: String,
    markers: Array
  }

  connect() {
    mapboxgl.accessToken = this.apiKeyValue

    this.map = new mapboxgl.Map({
      container: this.element,
      //style: "mapbox://styles/mapbox/dark-v11"
        style: "mapbox://styles/lateingame/clb28me8n003h14pprlv7piz9"
    })
    this.#addMarkersToMap()
    if ( this.markersValue.length ) { this.#fitMapToMarkers() }

    this.map.addControl(new MapboxGeocoder({ accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl }))
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window)
      console.log(popup)
      new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .setPopup(popup)
        .addTo(this.map)
    })
  }
  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => {
      bounds.extend([ marker.lng, marker.lat ])
    });

    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 })
  }
}
