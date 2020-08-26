import React from "react";
import db from "../firebase";



const markers = [];

db.collection("videos").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        markers.push({ id: doc.id, data: doc.data() });
    })
});

export default markers;