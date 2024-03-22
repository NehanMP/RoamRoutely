import React, { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

function ResetCenterView(props) {
  const { selectedPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectedPosition) {
      map.setView(
        L.latLng(selectedPosition?.lat, selectedPosition?.lon),
        map.getZoom(),
        {
          animate: true,
        }
      );
    }
  }, [selectedPosition]);

  return null;
}

function SetViewOnClick({ coords }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords);
  }, [coords, map]);
  return null;
}
function WeatherIcon({ lat, lon, weatherData }) {
  const map = useMap();

  useEffect(() => {
    if (weatherData) {
      let iconCode = weatherData.weather[0].icon;
      let iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

      const icon = new L.Icon({
        iconUrl: iconUrl,
        iconSize: [50, 50], // size of the icon
      });

      const marker = L.marker([lat, lon], { icon: icon }).addTo(map);

      return () => {
        map.removeLayer(marker);
      };
    }
  }, [map, lat, lon, weatherData]);

  return null;
}

function UpdateBounds({ setBounds }) {
  const map = useMap();
  useEffect(() => {
    map.on("moveend", () => {
      const bounds = map.getBounds();
      setBounds({
        ne: bounds.getNorthEast(),
        sw: bounds.getSouthWest(),
      });
    });
  }, [map, setBounds]);
  return null;
}

export default function Mapper({
  coords,
  setCoords,
  setBounds,
  places,
  childClicked,
  setChildClicked,
  weatherData

}) {
  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        setCoords(map.getCenter());
        setBounds(map.getBounds());
      },
    });
    return null;
  };

  function MarkerCluster({ places }) {
    const map = useMap();

    useEffect(() => {
      const markerClusterGroup = L.markerClusterGroup();
      places.forEach((place, i) => {
        if (place.latitude && place.longitude) {
          const marker = L.marker([place.latitude, place.longitude]).bindPopup(
            place.name
          );
          markerClusterGroup.addLayer(marker);
        }
      });
      map.addLayer(markerClusterGroup);

      return () => {
        map.removeLayer(markerClusterGroup);
      };
    }, [map, places]);

    return null;
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={coords} zoom={13}>
        <SetViewOnClick coords={coords} />
        <MapEvents />
        <UpdateBounds setBounds={setBounds} />
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {places.map((place, i) =>
          place.latitude && place.longitude ? (
            <>
              <Marker
                key={i}
                position={[place.latitude, place.longitude]}
                eventHandlers={{ click: () => setChildClicked(i) }}
              >
                <Popup>{place.name}</Popup>
              </Marker>
              <WeatherIcon key={i} lat={place.latitude} lon={place.longitude} weatherData={weatherData} />
            </>
          ) : null
        )}
        <MarkerCluster places={places} />
      </MapContainer>
    </div>
  );
}
