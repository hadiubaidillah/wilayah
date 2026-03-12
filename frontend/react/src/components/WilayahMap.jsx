import React, { useEffect, useRef } from 'react'
import L from 'leaflet'

export default function WilayahMap({ wilayah }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const layerRef = useRef(null)

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [-2.5, 118],
        zoom: 5,
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstanceRef.current)
    }
  }, [])

  useEffect(() => {
    if (!wilayah || !mapInstanceRef.current) return

    if (layerRef.current) {
      mapInstanceRef.current.removeLayer(layerRef.current)
    }

    try {
      const coords = JSON.parse(wilayah.path)
      const latlngs = Array.isArray(coords[0]) && Array.isArray(coords[0][0])
        ? coords.map((ring) => ring.map(([lat, lng]) => [lat, lng]))
        : coords.map(([lat, lng]) => [lat, lng])

      layerRef.current = L.polygon(latlngs, {
        color: '#3b82f6',
        fillColor: '#93c5fd',
        fillOpacity: 0.4,
        weight: 2,
      }).addTo(mapInstanceRef.current)

      mapInstanceRef.current.fitBounds(layerRef.current.getBounds())
    } catch {
      mapInstanceRef.current.setView([wilayah.lat, wilayah.lng], 10)
      layerRef.current = L.marker([wilayah.lat, wilayah.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup(wilayah.nama)
        .openPopup()
    }
  }, [wilayah])

  return <div ref={mapRef} className="map-container" />
}
