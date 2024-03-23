import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';


const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map(props: { city: City; points: Point[]; selectedPoint: Point | undefined }): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, props.city);
  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      props.points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            props.selectedPoint !== undefined && point.title === props.selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, props.points, props.selectedPoint]);

  return <div style={{height: '90%', width: '100%', margin: '40px'}} ref={mapRef}></div>;
}

export type City = Point & {
    zoom: number;
};

export type Point = {
    title: string;
    latitude: number;
    longitude: number;
};
