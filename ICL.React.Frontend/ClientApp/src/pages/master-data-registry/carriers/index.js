import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import styled from "@emotion/styled";
import {spacing} from "@mui/system";
import {NavLink} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Carriers = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Helmet title="Master Data Registry: Carriers" />
      <Grid container spacing={2} alignItems="stretch" p={isLgUp ? 5 : 1}>
        <Grid item md={12}>
          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} to={"/master-data-registry"}>
              Master Data Registry
            </Link>
            <Typography>Carriers</Typography>
          </Breadcrumbs>
          <Typography variant="h3" gutterBottom display="inline" sx={{ color: "#23A295;" }}>
            Master Data Registry
          </Typography>
          <Typography variant="body2" gutterBottom>
            Carriers
          </Typography>
        </Grid>
        <Grid item md={12}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Carriers;