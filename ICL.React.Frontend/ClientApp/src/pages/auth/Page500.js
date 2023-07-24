import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Button as MuiButton, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import { useTranslation } from 'react-i18next';
const Button = styled(MuiButton)(spacing);

const Wrapper = styled.div`
  padding: ${(props) => props.theme.spacing(6)};
  text-align: center;
  background: transparent;

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function Page500() {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Helmet title="500 Error" />
      <Typography component="h1" variant="h1" align="center" gutterBottom>
        500
      </Typography>
      <Typography component="h2" variant="h5" align="center" gutterBottom>
        {t('Internal server error.')}
      </Typography>
      <Typography component="h2" variant="body1" align="center" gutterBottom>
        {t('The server encountered something unexpected that didn not t allow it to complete the request.')}
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        color="secondary"
        mt={2}
      >
        {t('Return to website')}
      </Button>
    </Wrapper>
  );
}

export default Page500;
