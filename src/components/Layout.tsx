import React from 'react';
import {
    Container, AppBar, Toolbar, Typography, InputBase, Menu, MenuItem,
    IconButton, Button, Drawer,
    List,
    ListItemButton,
    ListItemText,
    Box
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom'; // Updated import
import { AccountCircle, Search, Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../utils/store';
import { toggleTheme } from '../utils/themeSlice';


const TITLE = 'Library Browser';

export default function Layout() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const navigate = useNavigate(); // Use useNavigate hook

    const darkMode = useSelector((state: RootState) => state.theme.darkMode);
    const dispatch = useDispatch();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const toggleDarkMode = () => {
        dispatch(toggleTheme());
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 0, textAlign: { xs: "center", md: "start" } }}>
                        {TITLE}
                    </Typography>
                    <Box
                        sx={{
                            justifyContent: 'center', flexGrow: 1, gap: '10px',
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        <Button color="inherit" onClick={() => navigate("/books") }>Books</Button>
                        <Button color="inherit" onClick={() => navigate("/authors") }>Authors</Button>
                    </Box>
                    <Box sx={{
                        position: 'relative', marginRight: '20px',
                        backgroundColor: '#fff', borderRadius: '4px',
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center'
                    }}>
                        <Search style={{ marginLeft: '10px', fill: 'GrayText' }} /> {/* Use primary color */}
                        <InputBase
                            placeholder="Search…"
                            style={{ marginLeft: '10px', flex: 1, color: 'GrayText' }}
                        />
                    </Box>
                    <IconButton
                        edge="end"
                        aria-label="toggle dark mode"
                        onClick={toggleDarkMode}
                        color="inherit"
                        sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '10px' }}
                    >
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {/* title */}
                <Typography variant="h6" style={{ textAlign: 'center', margin: '10px' }}>
                    {TITLE}
                </Typography>
                <div style={{ margin: '10px' }} />
                <List>
                    <ListItemButton onClick={() => navigate("/books")}>
                        <ListItemText primary="Books" />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate("/authors")}>
                        <ListItemText primary="Authors" />
                    </ListItemButton>
                    <ListItemButton onClick={toggleDarkMode}>
                        <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
                        {darkMode ? <Brightness7 /> : <Brightness4 />}
                    </ListItemButton>
                </List>
            </Drawer>
            <Container>
                <Outlet />
            </Container>
        </>
    );
}

