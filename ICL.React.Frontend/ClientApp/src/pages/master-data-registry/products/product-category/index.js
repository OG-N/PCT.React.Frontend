import React from "react";
import styled from "@emotion/styled";
import {Breadcrumbs as MuiBreadcrumbs, Grid, Link, Typography} from "@mui/material";
import {spacing} from "@mui/system";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Helmet} from "react-helmet-async";
import {NavLink} from "react-router-dom";
import ProductCategoryDataTable from "./ProductCategoryDataTable";

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const ProductCategory = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <React.Fragment>
      <Helmet title="Master Data Registry: Product Category" />
      <Grid container spacing={2} alignItems="stretch" p={isLgUp ? 5 : 1}>
        <Grid item md={12}>
          <ProductCategoryDataTable />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default ProductCategory;