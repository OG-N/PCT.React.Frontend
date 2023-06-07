import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent, Divider, Paper as MuiPaper, Tooltip,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {spacing} from "@mui/system";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useQuery} from "@tanstack/react-query";
import {getProductUnits} from "../../../../api/product-unit";

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

const ProductUnitsDataTable = () => {
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

  const handleEditProductUnit = (params) => {
    navigate(
      `/master-data-registry/products/product-units/new-product-unit/${params.id}`
    );
  };

  const {
    data: ProductUnits,
    isLoading: isLoadingProductUnits,
    isError: isErrorProductUnits,
  } = useQuery(["getProductUnits"], getProductUnits);

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <ThemeProvider theme={themeCustom}>
          <Button
            mr={2}
            variant="contained"
            color="custom_black"
            onClick={() => navigate("/master-data-registry/products/product-units/new-product-unit")}
          >
            ADD PRODUCT UNIT
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
                headerName: "Product Unit Name",
                editable: false,
                flex: 1,
              },
              {
                field: "description",
                headerName: "Product Unit Description",
                editable: false,
                flex: 1,
              },
              {
                field: "Action",
                headerName: "",
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
                        onClick={() => handleEditProductUnit(params)}
                        sx={{ color: "#014d88", fontWeight: "bolder" }}
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
            rows={isLoadingProductUnits || isErrorProductUnits ? [] : ProductUnits ? ProductUnits.data : []}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </Paper>
    </Card>
  );
};
export default ProductUnitsDataTable;