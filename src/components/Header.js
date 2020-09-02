import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import Menu from "./Menu";
import Search from "./Search";

const drawerWidth = 240;

// styles for the header
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: '300px',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    hide: {
        display: 'none',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '300px',
            '&:focus': {
                width: '400px',
            },
        },
    },
}));

export default function Header({ panTo, sortByCategory, category, setCategory }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    return <div className={classes.root}>
        <AppBar position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => {
                        setOpen(true);
                    }}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    Live Trip
                </Typography>
                <div className={classes.search}>
                    <Search panTo={panTo} classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }} />

                </div>
            </Toolbar>
        </AppBar >
        <Menu open={open} setOpen={setOpen} sortByCategory={sortByCategory} category={category} setCategory={setCategory} />
    </div >;
}