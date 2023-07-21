import React from "react";
import styled from "@emotion/styled";
import {
    Avatar as MuiAvatar, Box,
    Card as MuiCard,
    CardContent as MuiCardContent, CardMedia,
    Divider as MuiDivider, Grid, Paper, Typography
} from "@mui/material";
import {spacing} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Helmet} from "react-helmet-async";
import Analytics from "./landing-page/Analytics";
import SupplyChainAnalytics from "./landing-page/SupplyChainAnalytics";
import FinanceAndAdministration from "./landing-page/FinanceAndAdministration";
import MasterDataRegistry from "./landing-page/MasterDataRegistry";
import {useQuery} from "@tanstack/react-query";
import {getCMSContentLeadershipByName} from "../../api/cmscontent-leadership";
import AddContentLeadership from "./AddContentLeadership";
import AddContentImpact from "./AddContentImpact";
import {getCMSContentImpactByName} from "../../api/cmscontent-impact";
import PalladiumSupplyChain from "../../vendor/palladium-supply-chain.png";

const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Spacer = styled.div(spacing);

const Avatar = styled(MuiAvatar)`
  display: inline-block;
  height: 80px;
  width: 80px;
`;

const LandingPage = () => {
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

    const [rolID, setrolID] = React.useState('HQ.User');
    const { data: dataLeadershipByRol, isLoading: isLoadingLeadershipByRol, isError: isErrorLeadershipByRol} =
        useQuery([rolID, "getCMSContentLeadershipByName"], getCMSContentLeadershipByName, { refetchOnWindowFocus: false, enabled:true}
    );
    const { data: dataImpactByRol, isLoading: isLoadingImpactByRol, isError: isErrorImpactByRol} =
        useQuery([rolID, "getCMSContentImpactByName"], getCMSContentImpactByName, { refetchOnWindowFocus: false, enabled:true });

    return (
        <React.Fragment>
            <Helmet title="Home" />
            <Paper square={true} sx={{ width: "100%" }}>
                <CardMedia
                    component="img"
                    sx={{ objectFit: "fill" }}
                    image={PalladiumSupplyChain}
                />
            </Paper>
            <Grid container spacing={2} p={isLgUp ? 12 : 5}>
                <Grid item xs={12}>
                    <Grid container direction="row" alignItems="stretch" spacing={2}>
                        <Grid item xs={3}>
                            <SupplyChainAnalytics />
                        </Grid>
                        <Grid item xs={3}>
                            <Analytics />
                        </Grid>
                        <Grid item xs={3}>
                            <FinanceAndAdministration />
                        </Grid>
                        <Grid item xs={3}>
                            <MasterDataRegistry />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" alignItems="stretch" spacing={2}>
                        <Grid item xs={8}>
                            <Box display="flex" height="100%">
                                <Paper square={true} sx={{ borderTop: 5,flex: 1 }} elevation={8}>
                                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Our Impact
                                            </Typography>
                                            <Divider />
                                            <Spacer mb={4} />
                                            <AddContentImpact
                                                dataImpactByRol={dataImpactByRol}
                                                isLoadingImpactByRol={isLoadingImpactByRol}
                                            />
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box display="flex" height="100%">
                                <Paper square={true} sx={{ borderTop: 5, flex: 1 }} elevation={8}>
                                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Leadership Profiles
                                            </Typography>
                                            <Divider />
                                            <Spacer mb={4} />
                                            <AddContentLeadership
                                                isLoadingLeadershipByRol={isLoadingLeadershipByRol}
                                                dataLeadershipByRol={dataLeadershipByRol}
                                            />
                                        </CardContent>
                                    </Card>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};
export default LandingPage;
