import React from "react";
import {Box, Card as MuiCard, CardContent, CardMedia, Grid, Paper, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {spacing} from "@mui/system";
import EastIcon from '@mui/icons-material/East';
import SupplyChainAnalytics from "../../../vendor/supply-chain-analytics.png";
import {NavLink} from "react-router-dom";

const Card = styled(MuiCard)(spacing);

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'blue',
    },
}));

const Analytics = () => {
    return (
        <React.Fragment>
            <Box justifyContent="center" alignItems="center">
                <Paper square={true} sx={{ borderTop: 5 }} elevation={8}>
                    <Card>
                        <CardContent>
                            <StyledNavLink to={`/home`}>
                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                    <Grid item xs={12} align="center" justify="center">
                                        <Paper sx={{ width: "30%" }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ objectFit: "fill" }}
                                                image={SupplyChainAnalytics}
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} align="center" justify="center">
                                        <Typography variant="h4" component="h4">
                                            Supply Chain Analytics
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} align="right" justify="right">
                                        <EastIcon />
                                    </Grid>
                                </Grid>
                            </StyledNavLink>
                        </CardContent>
                    </Card>
                </Paper>
            </Box>
        </React.Fragment>
    );
};
export default Analytics;
