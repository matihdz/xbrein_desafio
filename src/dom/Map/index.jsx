import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import categories from "../../data/categories.json";
import { usePois } from "../../hooks/usePois";
import { useCallback, useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef(null);
  const { data: markers, activePoi } = usePois();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const onMapLoad = (map) => {
    mapRef.current = map;
  };

  const getMarkerIcon = (marker) => {
    if (activePoi && marker.id === activePoi.id) return "/mapSvgs/location-active-dot-solid.svg";

    let categoryOfMarker = categories.find((category) => category.filter === marker?.category_name);
    return categoryOfMarker?.iconUrl ? categoryOfMarker?.iconUrl : "/mapSvgs/location-dot-solid.svg";
  };

  const fitBoundsToMarkers = useCallback(() => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend(new window.google.maps.LatLng(Number(marker.latitude), Number(marker.longitude)));
    });
    if (mapRef.current) {
      mapRef.current.fitBounds(bounds);

      const listener = window.google.maps.event.addListenerOnce(mapRef.current, "bounds_changed", () => {
        if (mapRef.current.getZoom() > 16) {
          mapRef.current.setZoom(16);
        }
      });
      window.google.maps.event.removeListener(listener);

      const idleListener = window.google.maps.event.addListenerOnce(mapRef.current, "idle", () => {
        if (mapRef.current.getZoom() > 16) {
          mapRef.current.setZoom(16);
        }
      });
      window.google.maps.event.removeListener(idleListener);
    }
  }, [markers]);

  useEffect(() => {
    if (isLoaded && markers && markers.length > 0) {
      fitBoundsToMarkers();
    }
  }, [isLoaded, markers, fitBoundsToMarkers]);

  useEffect(() => {
    if (mapRef?.current) {
      let isActivePoiInMarkers = !!markers.find((marker) => marker.id === activePoi?.id)?.id;
      if (isActivePoiInMarkers) {
        const newCenter = {
          lat: Number(activePoi.latitude),
          lng: Number(activePoi.longitude),
        };

        mapRef.current.panTo(newCenter);
        mapRef.current.setZoom(20);
      } else {
        fitBoundsToMarkers();
      }
    }
  }, [activePoi, fitBoundsToMarkers, markers]);

  return isLoaded ? (
    <GoogleMap onLoad={onMapLoad} zoom={14} center={{ lat: -33.4266707, lng: -70.6202899 }} mapContainerStyle={{ zIndex: 1, width: "100%", height: "100vh" }}>
      {markers &&
        markers.map((marker, index) => (
          <Marker
            key={marker?.id ? marker?.id : index}
            position={{ lat: Number(marker?.latitude), lng: Number(marker?.longitude) }}
            icon={{ url: getMarkerIcon(marker), scaledSize: new window.google.maps.Size(30, 30) }}
          />
        ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
