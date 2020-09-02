import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { LocationOn as All, Hotel as Hotels, Restaurant as Restaurants, Map as Traveling, LocalActivity as Entertainment, AccountBalance as HolySites } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function Menu({ open, setOpen, sortByCategory, category, setCategory }) {
    const classes = useStyles();
    const theme = useTheme();

    const handleDrawerClose = () => {
        setOpen(false);
    };

    function nameToTag(text) {
        switch (text) {
            case 'All':
                return <All />;
            case 'Hotels':
                return <Hotels />;
            case 'Restaurants':
                return <Restaurants />;
            case 'Traveling':
                return <Traveling />;
            case 'Entertainment':
                return <Entertainment />;
            case 'Holy Sites':
                return <HolySites />;
            default:
                break;
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['All', 'Hotels', 'Restaurants', 'Traveling', 'Entertainment', 'Holy Sites'].map((text, index) => (
                        <ListItem button key={index} value={text} style={(text === category) ? { color: "#00a09f" } : { color: "#808080" }} onClick={(event) => {
                            setCategory(event.currentTarget.getAttribute('value'));
                            sortByCategory(event.currentTarget.getAttribute('value'));
                            handleDrawerClose();
                        }}>
                            <ListItemIcon style={(text === category) ? { color: "#00a09f" } : { color: "#808080" }}>{nameToTag(text)}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div >
    );
}