import React from "react";
import Fab from '@material-ui/core/Fab';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        zIndex: "10"
    },
}));

export default function Locate({ panTo, isLocated, setLocated }) {
    const classes = useStyles();

    return (!isLocated ? <Fab className={classes.fab} color="primary" aria-label="location" onClick={() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                setLocated(true);
            },
            () => null);
    }}>
        <MyLocationIcon />
    </Fab> : null);
}