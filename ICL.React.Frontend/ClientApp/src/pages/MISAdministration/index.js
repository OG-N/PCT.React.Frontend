import React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent, CardMedia,
  Divider as MuiDivider, Grid, Paper, Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {spacing} from "@mui/system";
import FirstImg from "../../vendor/illustration-MIS.png";
import {NavLink} from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Spacer = styled.div(spacing);

const MISAdministration = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Paper square={true} sx={{ width: "100%" }}>
        <CardMedia
          component="img"
          sx={{ height: 220, objectFit: "fill" }}
          image={FirstImg}
        />
      </Paper>
      <Grid container spacing={2} alignItems="stretch" p={isLgUp ? 12 : 5}>
        <Grid item md={4}  xs={4} px={5}>
          <Paper square={true} sx={{ borderTop: 5, borderColor: "#4D4D4D" }} style={{height:'100%'}} elevation={8}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t('Interoperability')}
                </Typography>
                <Divider />
                <Spacer mb={4} />
                <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                  <Grid container spacing={6}>
                    <Grid item md={12}>
                      <a href="https://portal.azure.com/#@grmfutures.onmicrosoft.com/resource/subscriptions/a8177bba-e9b3-4b53-a8d9-2c528828d5ec/resourceGroups/2IDUSA.476.243/providers/Microsoft.ServiceBus/namespaces/GHSC-ICL/overview" target="_blank" rel="noopener noreferrer">{t('Middleware Status')}</a>
                      &nbsp;&nbsp;&nbsp;
                      <br />
                      {/*<NavLink to={`/MISAdministration/middle-ware-status`}>*/}
                      {/*  Middleware Status*/}
                      {/*</NavLink>*/}
                      <Divider />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item md={4}  xs={4} px={5}>
          <Paper square={true} sx={{ borderTop: 5, borderColor: "#4D4D4D" }} style={{height:'100%'}} elevation={8}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t('Data Management')}
                </Typography>
                <Divider />
                <Spacer mb={4} />
                <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                  <Grid container spacing={6}>
                    <Grid item md={12}>
                      <a target="_blank" rel="noopener noreferrer" href="https://thepalladiumgroup.atlassian.net/wiki/spaces/GISS/pages/2119630896/Data+Warehouse">
                        {t('Data Warehouse')}
                      </a>
                      <Divider />
                    </Grid>
                    <Grid item md={12}>
                      <a target="_blank" rel="noopener noreferrer" href="https://thepalladiumgroup.atlassian.net/wiki/spaces/GISS/pages/2119532641/Data+Lake">
                        {t('Data Lake')}
                      </a>
                      <Divider />
                    </Grid>
                    <Grid item md={12}>
                      <a target="_blank" rel="noopener noreferrer" href="https://thepalladiumgroup.atlassian.net/wiki/spaces/GISS/pages/2119630918/Data+Marts">
                        {t('Data Marts')}
                      </a>
                      <Divider />
                    </Grid>
                    <Grid item md={12}>
                      <a href="#">
                        {t('Logic Apps')}
                      </a>
                      <Divider />
                    </Grid>
                    <Grid item md={12}>
                      <a href="#">
                        {t('Queues, Subscriptions, and Events')}
                      </a>
                      <Divider />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item md={4}  xs={4} px={5}>
          <Paper square={true} sx={{ borderTop: 5, borderColor: "#4D4D4D" }} style={{height:'100%'}} elevation={8}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t('User Management')}
                </Typography>
                <Divider />
                <Spacer mb={4} />
                <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                  <Grid container spacing={6}>
                    <Grid item md={12}>
                      <a target="_blank" rel="noopener noreferrer" href="https://portal.azure.com/#view/Microsoft_AAD_IAM/GroupDetailsMenuBlade/~/Overview/groupId/57228205-3e4e-4dc1-9ccc-98e4c88c0e42">
                        {t('User Registry')}
                      </a>
                      <Divider />
                    </Grid>
                    <Grid item md={12}>
                      <a target="_blank" rel="noopener noreferrer" href="https://portal.azure.com/#view/Microsoft_AAD_IAM/GroupDetailsMenuBlade/~/Overview/groupId/57228205-3e4e-4dc1-9ccc-98e4c88c0e42">
                        {t('Assign New User')}
                      </a>
                      <Divider />
                    </Grid>
                    <Grid item md={12}>
                      <a target="_blank" rel="noopener noreferrer" href="https://portal.azure.com/#view/Microsoft_AAD_IAM/GroupDetailsMenuBlade/~/Overview/groupId/57228205-3e4e-4dc1-9ccc-98e4c88c0e42">
                        {t('Remove User')}
                      </a>
                      <Divider />
                    </Grid>
                    <Grid item md={12}>
                    </Grid>
                    <Grid item md={12}>
                        <NavLink to={`/MISAdministration/users-list`}>
                            {t('Users Information')}
                        </NavLink>
                      <Divider />
                    </Grid>
                    <Grid item md={12}>
                        <NavLink to={`/MISAdministration/userroles-list`}>
                            {t('Roles Assignment')}
                        </NavLink>
                      <Divider />
                    </Grid>
                    <Grid item md={12}>
                        <NavLink to={`/MISAdministration/roles-list`}>
                            {t('Roles Management')}
                        </NavLink>
                      <Divider />
                    </Grid>
                    <Grid item md={12}>
                        <NavLink to={`/MISAdministration/roleoptions-List`}>
                            {t('Permission Management')}
                        </NavLink>
                      <Divider />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item md={4}  xs={4} px={5} sx={{marginTop:10}}>
          <Paper square={true} sx={{ borderTop: 5, borderColor: "#4D4D4D" }} style={{height:'100%'}} elevation={8}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {t('Information Security')}
                </Typography>
                <Divider />
                <Spacer mb={4} />
                <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                  <Grid container spacing={6}>
                    <Grid item md={12}>
                      <a href="https://thepalladiumgroup.atlassian.net/wiki/spaces/GISS/pages/2119696690/Information+Security+Policy" target="_blank" rel="noopener noreferrer">{t('Policy')}</a>
                      <Divider />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        <Grid item md={4} xs={4} px={5} sx={{ marginTop: 10 }}>
            <Paper square={true} sx={{ borderTop: 5, borderColor: "#4D4D4D" }} style={{ height: '100%' }} elevation={8}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {t('Content Management')}
                        </Typography>
                        <Divider />
                        <Spacer mb={4} />
                        <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                            <Grid container spacing={6}>
                                <Grid item md={12}>
                                    <NavLink to={`/MISAdministration/content-registry`}>
                                        {t('Content administration')}
                                    </NavLink>
                                    <Divider />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>

        {/*<Grid item md={4}  xs={4} px={5} sx={{marginTop:10}}>*/}
        {/*  <Paper square={true} sx={{ borderTop: 5, borderColor: "#4D4D4D" }} style={{height:'100%'}} elevation={8}>*/}
        {/*    <Card>*/}
        {/*      <CardContent>*/}
        {/*        <Typography gutterBottom variant="h5" component="div">*/}
        {/*          Architecture*/}
        {/*        </Typography>*/}
        {/*        <Divider />*/}
        {/*        <Spacer mb={4} />*/}
        {/*        <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>*/}
        {/*          <Grid container spacing={6}>*/}
        {/*            <Grid item md={12}>*/}
        {/*              <NavLink to={`/MISAdministration/about`}>*/}
        {/*                About*/}
        {/*              </NavLink>*/}
        {/*              <Divider />*/}
        {/*            </Grid>*/}
        {/*          </Grid>*/}
        {/*        </Box>*/}
        {/*      </CardContent>*/}
        {/*    </Card>*/}
        {/*  </Paper>*/}
        {/*</Grid>*/}
      </Grid>
    </React.Fragment>
  );
};
export default MISAdministration;