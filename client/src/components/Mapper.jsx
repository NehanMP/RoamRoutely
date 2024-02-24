import React, { useEffect } from "react";
import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";


function SetViewOnClick({ coords }) {
  const map = useMap();

  useEffect(() => {
    map.setView(coords);
  }, [coords, map]);

  return null;
}

function UpdateBounds({ setBounds }) {
  const map = useMap();

  useEffect(() => {
    map.on('moveend', () => {
      const bounds = map.getBounds();
      setBounds({
        ne: bounds.getNorthEast(),
        sw: bounds.getSouthWest(),
      });
    });
  }, [map, setBounds]);

  return null;
}

export default function Mapper({ coords, setCoords, setBounds, places }) {
  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        setCoords(map.getCenter());
        setBounds(map.getBounds());
      },
    });
    return null;
  };

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
        
        {places.map((place, i) => (
          place.latitude && place.longitude ? (
            <Marker key={i} position={[place.latitude, place.longitude]}>
              <Popup>{place.name}</Popup>
            </Marker>
          ) : null
        ))}
      </MapContainer>
    </div>
  );
}
