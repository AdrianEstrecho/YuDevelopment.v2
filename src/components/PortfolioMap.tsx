"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Project {
  name: string;
  location: string;
  coordinates: [number, number];
  status: string;
  type: string;
}

const projects: Project[] = [
  {
    name: "Vista Multifamily",
    location: "Atlanta, GA",
    coordinates: [-84.388, 33.749],
    status: "Pre-Development",
    type: "owned",
  },
  {
    name: "Greenfield Residences",
    location: "Charlotte, NC",
    coordinates: [-80.8431, 35.2271],
    status: "Coming Soon",
    type: "owned",
  },
  {
    name: "Meridian Apartments",
    location: "Raleigh, NC",
    coordinates: [-78.6382, 35.7796],
    status: "Coming Soon",
    type: "owned",
  },
  {
    name: "Parkside Mixed-Use",
    location: "Nashville, TN",
    coordinates: [-86.7816, 36.1627],
    status: "Under Construction",
    type: "services",
  },
  {
    name: "Harbor District Entitlements",
    location: "Savannah, GA",
    coordinates: [-81.0998, 32.0809],
    status: "Under Construction",
    type: "services",
  },
  {
    name: "Lakeview Residences",
    location: "Birmingham, AL",
    coordinates: [-86.8025, 33.5207],
    status: "Completed",
    type: "services",
  },
];

export default function PortfolioMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [-85.5, 33.5],
      zoom: 5.2,
      attributionControl: true,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    projects.forEach((project) => {
      const color = project.type === "owned" ? "#4a6af5" : "#e0a830";

      const el = document.createElement("div");
      el.style.width = "28px";
      el.style.height = "36px";
      el.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 36' fill='none'>
          <path d='M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z' fill='${color}'/>
          <circle cx='14' cy='13' r='5' fill='white'/>
        </svg>`
      )}")`;
      el.style.backgroundSize = "contain";
      el.style.backgroundRepeat = "no-repeat";
      el.style.cursor = "pointer";

      new mapboxgl.Marker({ element: el })
        .setLngLat(project.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(
            `<div style="font-family:sans-serif;padding:4px 0">
              <p style="font-weight:600;margin:0 0 4px;font-size:14px;color:#111">${project.name}</p>
              <p style="margin:0;font-size:12px;color:#555">${project.location}</p>
              <p style="margin:4px 0 0;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.05em">${project.status}</p>
            </div>`
          )
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!token) {
    return (
      <div className="w-full aspect-[21/9] bg-gray-100 rounded-lg border border-gray-200 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-gray-500 font-medium">Project Locations Map</p>
          <p className="text-xs text-gray-400 mt-1">Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mapContainer}
      className="w-full aspect-[21/9] rounded-lg overflow-hidden border border-gray-200"
    />
  );
}
