import React from 'react';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from "date-fns";

// custom style
import mapStyles from "../mapStyles";

import Header from "./Header";
import Locate from "./Locate";
import Map from "./Map";
import Markers from "./Markers";

// setup options for google maps
const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "100vh",
    position: "absolute"
};

const center = {
    lat: 31.768318,
    lng: 35.213711
};

const options = {
    // styles: mapStyles,
    disableDefaultUI: true
};

export default function App() {
    // setting google script with api
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    // state for keeping the markers and the chosen marker
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState();
    const [isLocated, setLocated] = React.useState(false);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    var panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(16);
    }, []);

    const onMapClick = React.useCallback(event => {
        setMarkers(current => [
            ...current,
            {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    if (loadError)
        return "Error loading maps";
    if (!isLoaded)
        return "Loading maps";

    return <div>
        <Header panTo={panTo} />
        <Locate panTo={panTo} isLocated={isLocated} setLocated={setLocated} />
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={options}
            onClick={onMapClick}
            onLoad={onMapLoad}
            onCenterChanged={() => {
                if (isLocated)
                    setLocated(false);
            }}
        >
            {markers.map(marker =>
                <Marker
                    key={marker.time.toISOString()}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    icon={{
                        url: "/LiveTripMarker.svg",
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15)
                    }}
                    onClick={() => {
                        setSelected(marker);
                    }}
                />
            )}

            {selected && (<InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                    setSelected(null);
                }}>
                <div>
                    <h2>Bear Spotted!</h2>
                    <p>Spotted {formatRelative(selected.time, new Date())}</p>
                </div>
            </InfoWindow>)}
        </GoogleMap>

    </div >;
}