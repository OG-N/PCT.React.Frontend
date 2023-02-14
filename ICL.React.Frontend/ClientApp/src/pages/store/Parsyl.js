import React from "react";
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button as MuiButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ReplyIcon from '@mui/icons-material/Reply';

const Button = styled(MuiButton)(spacing);

const themeCustom = createTheme({
  palette: {
    secondary: {
      main: "#FFB500",
    },
  },
});

const Parsyl = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Grid container p={isLgUp ? 12 : 5}>
      <Grid item md={12}>
        <Grid container spacing={6}>
          <Grid item>
            <ThemeProvider theme={themeCustom}>
              <Button
                mr={2}
                variant="contained"
                color="secondary"
                onClick={() => navigate("/store")}
              >
                <ReplyIcon />
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
        <br />
        <Grid container justifyContent="center" spacing={1} alignItems="stretch" sx={{ minHeight: "800px" }}>
          <Grid item md={12} zeroMinWidth>
            <iframe title="Parsyl" width="100%" height="100%"
                    src="https://app.parsyl.com/report/shipments/v3/aa5dcfff-b494-4f63-9544-34b5f537d497?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY3NTc2MjAsImlhdCI6MTY3NjMyNTYyMCwiaXNzIjoicGFyc3lsLWFwaSIsInVzZXJJZCI6IjRiOGIwZjAxLWZhNTAtNDY1Ni1hNTYxLWU0MDJlYTA2MjMxZCIsInJlc291cmNlSWQiOiJhYTVkY2ZmZi1iNDk0LTRmNjMtOTU0NC0zNGI1ZjUzN2Q0OTciLCJyZXNvdXJjZVR5cGUiOiJzaGlwbWVudCJ9.NP14JC4EH0gOTkhO4HAcvKUDGHx3gKq-KYJKPWZcTS4"
                    frameBorder="0" allowFullScreen="true"></iframe>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Parsyl;