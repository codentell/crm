import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Toolbar, AppBar, Box, Typography } from '@material-ui/core';
import { Link, useRouteMatch } from 'react-router-dom';
import { UserMenu, Logout, LoadingIndicator } from 'react-admin';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    logo: {
        width: 50,
        height: 43.54,
    },
});

const Header = () => {
    const classes = useStyles();
    const match = useRouteMatch(['/contacts', '/companies', '/deals']);
    const currentPath = match?.path ?? '/';

    return (
        <nav className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar variant="dense">
                    <Box flex={1} display="flex" justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <Typography component="span" variant="h5">
                                BioLinked
                            </Typography>
                        </Box>
                        <Box>
                            <Tabs
                                value={currentPath}
                                aria-label="Navigation Tabs"
                            >
                                <Tab
                                    label={'Home'}
                                    component={Link}
                                    to="/"
                                    value="/"
                                />
                                 <Tab
                                    label={'Search'}
                                    component={Link}
                                    to="/companies"
                                    value="/companies"
                                />
                              
                             
                                <Tab
                                    label={'Leads'}
                                    component={Link}
                                    to="/deals"
                                    value="/deals"
                                />
                                  <Tab
                                    label={'My Network'}
                                    component={Link}
                                    to="/contacts"
                                    value="/contacts"
                                />
                                
                            </Tabs>
                        </Box>
                        <Box display="flex">
                            <LoadingIndicator />
                            <UserMenu logout={<Logout button />} />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </nav>
    );
};

export default Header;
