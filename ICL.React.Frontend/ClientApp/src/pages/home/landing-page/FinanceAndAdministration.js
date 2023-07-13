import React from "react";
import {Box, Card as MuiCard, CardContent, CardMedia, Grid, Paper, Typography} from "@mui/material";
import styled from "@emotion/styled";
import {spacing} from "@mui/system";
import EastIcon from '@mui/icons-material/East';
import FinanceAdministration from "../../../vendor/finance-administration.png";

const Card = styled(MuiCard)(spacing);

const FinanceAndAdministration = () => {
    return (
        <React.Fragment>
            <Box>
                <Paper square={true} sx={{ borderTop: 5 }} elevation={8}>
                    <Card>
                        <CardContent>
                            <Grid container alignItems="center" justifyContent="center" spacing={2}>
                                <Grid item xs={12} align="center" justify="center">
                                    <Paper sx={{ width: "30%" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ objectFit: "fill" }}
                                            image={FinanceAdministration}
                                        />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} align="center" justify="center">
                                    <Typography variant="h4" component="h4">
                                        Finance & Administration
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} align="right" justify="right">
                                    <EastIcon />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Paper>
            </Box>
        </React.Fragment>
    );
};
export default FinanceAndAdministration;
