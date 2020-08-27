import React from "react";
import db from "./firebase";

export default function Markers({ markers, setMarkers }) {
    db.collection("videos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setMarkers((prevMarkers) => [...prevMarkers, { id: doc.id, data: doc.data() }])
        })
    });
}