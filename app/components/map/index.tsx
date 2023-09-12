"use client";

import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface MapProps {
  center?: number[];
}

const Map = ({ center }: MapProps) => {
  return (
    <MapContainer
      center={(center as L.LatLngExpression) || [51.505, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className="h-[300px] rounded-lg"
    >
      <TileLayer attribution={attribution} url={url} />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
