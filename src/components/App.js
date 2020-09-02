import React from 'react';

import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import db from "../firebase";

import Header from "./Header";
import Locate from "./Locate";

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
    disableDefaultUI: true,
    minZoom: 3,
    maxZoom: 20
};

// Create a reference to the collection
const dbRef = db.collection("videos");

export default function App() {
    // setting google script with api
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });

    // state for keeping the markers and the chosen marker
    const [markers, setMarkers] = React.useState([]);
    const [displayVideo, setDisplayVideo] = React.useState(false);
    const [selected, setSelected] = React.useState();
    const [isLocated, setLocated] = React.useState(false);
    const [category, setCategory] = React.useState("All");

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
        sortByCategory("All");
    }, [])

    var panTo = React.useCallback(({ lat, lng, zoom = 16 }) => {
        mapRef.current.panTo({ lat, lng });
        if (zoom) {
            setSelected(null);
            setDisplayVideo(false);
            mapRef.current.setZoom(zoom);
        }
    }, []);

    if (loadError)
        return "Error loading maps";
    if (!isLoaded)
        return "Loading maps";

    function sortByCategory(category) {
        var sortedRef = dbRef;

        if (category !== "All") {
            // Create a query against the collection.
            sortedRef = dbRef.where("category", "==", category);
        }
        setMarkers([]);
        setSelected(null);
        setDisplayVideo(false);

        sortedRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setMarkers((prevMarkers) => [...prevMarkers, { id: doc.id, data: doc.data() }])
            })
        });
    }

    return <div>
        <Header panTo={panTo} sortByCategory={sortByCategory} category={category} setCategory={setCategory} />
        <Locate panTo={panTo} isLocated={isLocated} setLocated={setLocated} />
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={center}
            options={options}
            onLoad={onMapLoad}
            onClick={() => {
                setSelected(null);
                setDisplayVideo(false);
            }}
            onDragEnd={() => {
                if (isLocated)
                    setLocated(false);
            }}
        >
            {markers.map((marker, index) => {
                return <Marker
                    key={index}
                    position={{ lat: parseFloat(marker.data.latitude), lng: parseFloat(marker.data.longitude) }}
                    icon={{
                        url: "/LiveTripMarker.svg",
                        scaledSize: new window.google.maps.Size(30, 30)
                    }}
                    onClick={() => {
                        if (!selected)
                            setSelected(marker);
                        else if (selected.id === marker.id) {
                            setSelected(null);
                            setDisplayVideo(false);
                        }
                        else {
                            setDisplayVideo(false);
                            setSelected(marker);
                        }
                    }}
                />;
            }
            )}

            {selected && (<InfoWindow
                options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
                position={{ lat: parseFloat(selected.data.latitude), lng: parseFloat(selected.data.longitude) }}
                onCloseClick={() => {
                    setSelected(null);
                    setDisplayVideo(false);
                }}>
                <div className="info-window" onClick={() => {
                    panTo({ lat: parseFloat(selected.data.latitude), lng: parseFloat(selected.data.longitude), zoom: null });
                    setDisplayVideo(true);
                }}>
                    <h2>{selected.data.name}</h2>
                    {displayVideo && <video width="320" height="180" controls autoPlay>
                        <source src={selected.data.videoURL} type="video/mp4" />
                    </video>}
                </div>
            </InfoWindow>)}
        </GoogleMap>
    </div>;
}