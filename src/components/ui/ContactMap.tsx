'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default marker icons broken by webpack
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export default function ContactMap() {
  return (
    <MapContainer
      center={[50.016, 19.984]}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%', minHeight: '400px' }}
    >
      {/* Dark theme tiles — Stadia Maps Alidade Smooth Dark (free, no API key) */}
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={[50.016, 19.984]} icon={icon}>
        <Popup>
          <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            Kraków, Poland 👋
          </span>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
