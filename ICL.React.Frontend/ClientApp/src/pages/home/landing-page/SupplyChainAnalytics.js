import React from "react";
import {Box, Card as MuiCard, CardContent, CardMedia, Grid, Paper, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {spacing} from "@mui/system";
import EastIcon from '@mui/icons-material/East';
import SupplyChainOperations from "../../../vendor/supply-chain-operations.png";
import {NavLink} from "react-router-dom";

const Card = styled(MuiCard)(spacing);

const StyledNavLink = styled(NavLink)(({ theme }) => ({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'blue',
    },
}));

const SupplyChainAnalytics = () => {
    return (
        <React.Fragment>
            <Box>
                <Paper square={true} sx={{ borderTop: 5 }} elevation={8}>
                    <Card>
                        <CardContent>
                            <StyledNavLink to={`/psa`}>
                                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                    <Grid item xs={12} align="center" justify="center">
                                        <Paper sx={{ width: "30%" }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ objectFit: "fill" }}
                                                image={SupplyChainOperations}
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} align="center" justify="center">
                                        <Typography variant="h4" component="h4">
                                            Supply Chain Operations
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
export default SupplyChainAnalytics;
