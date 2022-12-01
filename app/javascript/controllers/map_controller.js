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
      style: "mapbox://styles/mapbox/dark-v11"
      // style: "mapbox://styles/lateingame/clb28me8n003h14pprlv7piz9"
    })
    this.#addMarkersToMap()
    if (this.markersValue.length) { this.#fitMapToMarkers() }

    this.#fitMapToMarkers()

    this.map.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }))

    // Add zoom and rotation controls to the map. WORKING
    this.map.addControl(new mapboxgl.NavigationControl());

    // ADD FIND USER TO THE MAP

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
    );
    this.getUsersLocation()

  }

  //       // TENTATIVA DE NAVEGAÇÃO COMPLEXA DO MAPBOX - USER ROUTING STARTS HERE
  getUsersLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.start = [position.coords.longitude, position.coords.latitude]
      // this.start = [10,10]
      this.connectRoute()
    })
  }

  //       // create a function to make a directions request
  async getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${this.start[0]},${this.start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    console.log(query)
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
    // if the route already exists on the map, we'll reset it using setData
    if (this.map.getSource('route')) {
      this.map.getSource('route').setData(geojson);
    }
    // otherwise, we'll make a new request
    else {
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      });
    }
    // add turn instructions here at the end
  }

  connectRoute() {
    this.map.on('load', () => {
      // make an initial directions request that
      // starts and ends at the same location
      this.getRoute(this.start);

      // Add starting point to the map
      this.map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: this.start
                }
              }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be'
        }
      });
      // this is where the code from the next step will go
      this.map.on('dblclick', (event) => {
        const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
        const end = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: coords
              }
            }
          ]
        };
        if (this.map.getLayer('end')) {
          this.map.getSource('end').setData(end);
        } else {
          this.map.addLayer({
            id: 'end',
            type: 'circle',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'Point',
                      coordinates: coords
                    }
                  }
                ]
              }
            },
            paint: {
              'circle-radius': 10,
              'circle-color': '#f30'
            }
          });
        }
        this.getRoute(coords);
      });
    });
  }

  #addMarkersToMap() {
    this.markersValue.forEach((marker) => {
      const popup = new mapboxgl.Popup().setHTML(marker.info_window)
      // Create a HTML element for your custom marker
      const customMarker = document.createElement("div")
      customMarker.className = "marker"
      customMarker.style.backgroundImage = `url('${marker.image_url}')`
      customMarker.style.backgroundSize = "contain"
      customMarker.style.width = "25px"
      customMarker.style.height = "25px"

      // Pass the element as an argument to the new marker
      new mapboxgl.Marker(customMarker)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(this.map)


      // new mapboxgl.Marker()
      //   .setLngLat([ marker.lng, marker.lat ])
      //   .setPopup(popup)
      //   .addTo(this.map)
    })

  }
  #fitMapToMarkers() {
    const bounds = new mapboxgl.LngLatBounds()
    this.markersValue.forEach(marker => {
      bounds.extend([marker.lng, marker.lat])
    });

    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 150 })
  }
}
