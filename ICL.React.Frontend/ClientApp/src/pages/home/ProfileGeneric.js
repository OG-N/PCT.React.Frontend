import React from "react";
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {
    Avatar as MuiAvatar,
    Box,
    Card as MuiCard,
    CardContent as MuiCardContent, CardMedia,
    Divider as MuiDivider,
    Grid,
    Paper,
    Typography,
    ListItemIcon, ListItem
} from "@mui/material";

import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter'; 
import PhoneIcon from '@mui/icons-material/Phone';
import BannerContent from "./HomeBanner";

import styled from "@emotion/styled";
import {spacing} from "@mui/system";
// import { orange } from "@mui/material/colors";
import {useParams } from "react-router-dom";
import {useQuery } from "@tanstack/react-query";
import FirstImg from "../../vendor/illustration-manage.png";
import {NavLink} from "react-router-dom";
import PlaceIcon from "@mui/icons-material/Place";
import async from "../../components/Async";
import { getCMSContentLeadershipByID } from "../../api/cmscontent-leadership";


const Avatar = styled(MuiAvatar)`
  display: inline-block;
  height: 80px;
  width: 80px;
`;
const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Spacer = styled.div(spacing);

const ProfileGeneric = () => {

    const location = useLocation();   
    const id_profile = location.state;

    const { data: dataLeadershipById, isLoading: isLoadingLeadershipById, isError: isErrorLeadershipById } =
        useQuery([id_profile, "getCMSContentLeadershipByID"], getCMSContentLeadershipByID, { refetchOnWindowFocus: false, enabled: true }
        );

    const AddContentLeadershipByID = () => {
        if (isLoadingLeadershipById) { return; }
        if (dataLeadershipById && dataLeadershipById.data) {
            return dataLeadershipById.data.map(element => (
              <div>
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item md={12} xs={12} px={5} sx={{ marginTop: 10 }}>
                        <Paper square={true} sx={{ borderTop: 5, borderTopColor: "black" }} elevation={8}>
                            <Card>
                                <CardContent>
                                    <Spacer mb={4} />
                                    <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                                        <Grid container spacing={12}>
                                            <Grid item md={3}>
                                                <Avatar alt="{element.name}" src={element.image} style={{
                                                    border: '0.1px solid lightgray'
                                                }} />
                                                <Grid item>
                                                    <Typography sx={{ fontWeight: 700, fontSize: 20 }}>
                                                        {element.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography sx={{ fontSize: 15, color: 'orange' }}>{element.position}</Typography>
                                                    <ListItemIcon style={{ marginTop: 5 }}>
                                                        <PhoneIcon /><Typography sx={{ fontSize: 10, color: 'orange', margin: 2 }}>{element.phone}</Typography>
                                                    </ListItemIcon>
                                                    <ListItem key="Email" component="a" href={"mailto:"+element.email} sx={{ padding: '0px' }}>
                                                        <EmailIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                                                        <Typography variant="h6" sx={{ fontSize: 10, color: 'orange', margin: 2 }}>{element.email}</Typography>
                                                    </ListItem>
                                                </Grid>
                                            </Grid>
                                            <Grid item md={9}>
                                                <Grid item>
                                                    <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Bio</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" sx={{ fontSize: 15 }}>
                                                        {element.bio}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>

                </Grid>

                <Grid container spacing={2} alignItems="stretch">
                    <Grid item md={12}  xs={12} px={5} sx={{marginTop:10}}>
                        <Paper square={true} sx={{ borderTop: 5,borderTopColor:"black" }} elevation={8}>
                            <Card>
                                <CardContent>
                                
                                    <Spacer mb={4} />
                                    <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                                        <Grid container spacing={12}>                                        
                                            <Grid item md={12}>
                                                <Grid item>
                                                    <Typography sx={{ fontWeight: 700, fontSize: 20 }}>Alignment to Project Objectives</Typography>
                                                </Grid>
                                                    <Grid item>                                                                                                           
                                                        {element.alignment.replaceAll("\n\n", "\n").split("\n").map(place => <Typography sx={{ fontSize: 15, color: 'grey' }}><li> {place} </li></Typography>)}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>

                </Grid>
              </div>
            ))
        }
    }; 

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <BannerContent/>
            </Grid>
            <br />
            {AddContentLeadershipByID()}            
        </React.Fragment>
    );
};
export default ProfileGeneric;
