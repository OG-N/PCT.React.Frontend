import React, {useState} from "react";
import styled from "@emotion/styled";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent, Divider,
  Paper as MuiPaper,
} from "@mui/material";
import {spacing} from "@mui/system";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useQuery} from "@tanstack/react-query";
import {getCategoryById} from "../../../api/category";
import {getUnitById} from "../../../api/unit";
import {getCarriers} from "../../../api/carrier";

const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const Button = styled(MuiButton)(spacing);
const Paper = styled(MuiPaper)(spacing);

const themeCustom = createTheme({
  palette: {
    custom_black: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
  },
});

const CarriersDataTable = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditCarrier = (params) => {
    navigate(
      `/master-data-registry/carriers/new-carrier/${params.id}`
    );
  };
  const {
    data: carriersData,
    isLoading,
    isError,
  } = useQuery(["getCarriers"], getCarriers);

  function GetLocationCategoryName (params) {
    const productCategoryId = params.value;
    const result = useQuery(
      ["getCategoryById", productCategoryId],
      getCategoryById
    );
    if (result && result.data) {
      return result.data.data.name;
    }
  }

  function GetLocationUnitName (params) {
    const productUnitId = params.value;
    const result = useQuery(
      ["getUnitById", productUnitId],
      getUnitById
    );
    if (result && result.data) {
      return result.data.data.name;
    }
  }

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <ThemeProvider theme={themeCustom}>
          <Button
            mr={2}
            variant="contained"
            color="custom_black"
            onClick={() => navigate("/master-data-registry/carriers/new-carrier")}
          >
            ADD NEW CARRIER
          </Button>
        </ThemeProvider>
      </CardContent>
      <br />
      <Paper>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            columns={[
              {
                field: "name",
                headerName: "Carrier Name",
                editable: false,
                flex: 1,
              },
              {
                field: "category",
                headerName: "Category",
                editable: false,
                flex: 1,
                valueGetter: GetLocationCategoryName,
              },
              {
                field: "unit",
                headerName: "Units",
                editable: false,
                flex: 1,
                valueGetter: GetLocationUnitName,
              },
              {
                field: "description",
                headerName: "Description",
                editable: false,
                flex: 1,
              },
              {
                field: "action",
                headerName: "Action",
                sortable: false,
                flex: 1,
                renderCell: (params) => (
                  <>
                    <Button
                      startIcon={<MoreVertIcon />}
                      size="small"
                      onClick={handleClick}
                    ></Button>
                    <Menu
                      id="demo-customized-menu"
                      MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => handleEditCarrier(params)}
                        disableRipple
                      >
                        <EditIcon />
                        Edit
                      </MenuItem>
                      <Divider />
                      <MenuItem>
                        <DeleteIcon />
                        Delete
                      </MenuItem>
                    </Menu>
                  </>
                ),
              },
            ]}
            rows={isLoading || isError ? [] : carriersData ? carriersData.data : []}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </Paper>
    </Card>
  );
};
export default CarriersDataTable;