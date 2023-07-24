import React from "react";
import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardMedia,
  Divider as MuiDivider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
// import { orange } from "@mui/material/colors";
import FirstImg from "../../vendor/illustration-plan.png";
import {NavLink, Link} from "react-router-dom";

const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Divider = styled(MuiDivider)(spacing);
const Spacer = styled.div(spacing);


const PlanLinks = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid container spacing={2} alignItems="stretch" p={isLgUp ? 12 : 5}>
      <Grid item md={4} style={{display: 'flex'}}>
        <Paper square={true} sx={{ borderTop: 5, borderColor: "#BA0C2F" }} elevation={8}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Planning Inputs
              </Typography>
              <Divider />
              <Spacer mb={4} />
              <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                <Grid container spacing={6}>
                  <Grid item md={12}>
                    <a target="_blank" rel="noopener noreferrer" href="https://thepalladiumgroup.atlassian.net/wiki/spaces/GISS/pages/2118385665/Quantification+Reports">Quantification Reports</a>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/quarterly-supply-plans`}>
                      Quarterly Supply Plans
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/quarterly-supply-plans`}>
                      Historical Distribution Orders
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/psa-inbound-product-monitoring`}>
                      PSA Inbound Product Monitoring
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/customs-clearance`}>
                      Custom Clearance Monitoring
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/custom-requirements`}>
                      Customs Requirements
                    </NavLink>
                    <Divider />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item md={4} style={{display: 'flex'}}>
        <Paper square={true} sx={{ borderTop: 5, borderColor: "#BA0C2F" }} elevation={8}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Order Visibility
              </Typography>
              <Divider />
              <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                <Grid container spacing={1}>
                  <Grid item md={12}>
                    <Card>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Inbound Visibility
                        </Typography>
                        <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                          <Grid container spacing={6}>
                            <Grid item md={12}>
                              <NavLink to={`/shipment/pos`}>
                                Advanced Shipment Notice(ASN)
                              </NavLink>
                              <Divider />
                            </Grid>
                            <Grid item md={12}>
                              <NavLink to={`/shipment/pos-validated`}>
                                Advanced Shipment Notice(ASN) - Validated
                              </NavLink>
                              <Divider />
                            </Grid>
                            <Grid item md={12}>
                              <NavLink to={`/plan/inbound-milestone-monitoring`}>
                                Inbound Milestone Monitoring
                              </NavLink>
                              <Divider />
                            </Grid>
                          </Grid>
                        </Box>
                        <Typography gutterBottom variant="h5" component="div">
                          Order Fulfillment
                        </Typography>
                        <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                          <Grid container spacing={6}>
                            <Grid item md={12}>
                              <NavLink to={`/customer-orders/pos`}>
                                Distribution Order Requests
                              </NavLink>
                              <Divider />
                            </Grid>
                            <Grid item md={12}>
                              <NavLink to={`/customer-orders/pos-validated`}>
                                Distribution Order Requests - Validated
                              </NavLink>
                              <Divider />
                            </Grid>
                            <Grid item md={12}>
                              <NavLink to={`/plan/outbound-milestone-monitoring`}>
                                Outbound Milestone Monitoring
                              </NavLink>
                              <Divider />
                            </Grid>
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
      <Grid item md={4} style={{display: 'flex'}}>
        <Paper square={true} sx={{ borderTop: 5, borderColor: "#BA0C2F" }} elevation={8}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Operational Planning
              </Typography>
              <Divider />
              <Spacer mb={4} />
              <Box px={4} my={3} sx={{ fontSize: 17, color: "#333333" }}>
                <Grid container spacing={6}>
                  <Grid item md={12}>
                    <NavLink to={`/plan/inventory-on-hand`}>
                      Inventory on Hand
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/inbound-inventory-monitoring`}>
                      Inbound Inventory Monitoring
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/insurance-monitoring`}>
                      Insurance Monitoring and Alerts
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/stock-balancing`}>
                      Stock Balancing
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/historical-orders`}>
                      Historical Orders
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/forecasted-orders`}>
                      Forecasted Orders
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/supply-and-demand`}>
                      Supply and Demand Reconciliation
                    </NavLink>
                    <Divider />
                  </Grid>
                  <Grid item md={12}>
                    <NavLink to={`/plan/delivery-planning`}>
                      Delivery Planning
                    </NavLink>
                    <Divider />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Paper>
      </Grid>
    </Grid>
  );
};

const Manage = () => {
  return (
    <React.Fragment>
      <Paper square={true} sx={{ width: "100%" }}>
        <CardMedia
          component="img"
          sx={{ height: 220, objectFit: "fill" }}
          image={FirstImg}
        />
      </Paper>
      <PlanLinks />
    </React.Fragment>
  );
};
export default Manage;
