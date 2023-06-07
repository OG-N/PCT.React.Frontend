import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
import {
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent, Divider, Paper as MuiPaper, Stack, Tooltip,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {spacing} from "@mui/system";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import {useQuery} from "@tanstack/react-query";
import {getProducts} from "../../../api/product";
import {getProductCategoryById} from "../../../api/product-category";
import {getProductUnitById} from "../../../api/product-unit";

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
    custom_blue: {
      main: "#23A295",
      contrastText: "#FFFFFF",
    },
  },
});

const ProductsDataTable = () => {
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

  const handleEditProduct = (params) => {
    navigate(
      `/master-data-registry/products/new-product/${params.id}`
    );
  };

  const {
    data: productsData,
    isLoading,
    isError,
    error
  } = useQuery(["getProducts"], getProducts);

  function GetProductCategoryName(params) {
    const productCategoryId = params.value;
    const result = useQuery(
      ["getProductCategoryById", productCategoryId],
      getProductCategoryById
    );
    if (result && result.data) {
      return result.data.data.name;
    }
  }

  function GetProductUnitName(params) {
    const productUnitId = params.value;
    const result = useQuery(
      ["getProductUnitById", productUnitId],
      getProductUnitById
    );
    if (result && result.data) {
      return result.data.data.name;
    }
  }

  function GetProductStatus(params) {
    const productStatus = params.value;
    if (productStatus == 0) {
      return "Pending";
    } else {
      return "Approved";
    }
  }

  if (isLoading) {
    return "Loading....";
  }

  if (isError) {
    toast(error.response.data, {
      type: "error",
    });
  }

  return (
    <Card mb={6}>
      <CardContent pb={1}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <ThemeProvider theme={themeCustom}>
            <Button
              mr={2}
              variant="contained"
              color="custom_black"
              onClick={() => navigate("/master-data-registry/products/new-product")}
            >
              ADD PRODUCT
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={themeCustom}>
            <Button
              mr={2}
              variant="contained"
              color="custom_blue"
              onClick={() => navigate("/master-data-registry/products/new-product")}
            >
              UPLOAD PRODUCT LIST
            </Button>
          </ThemeProvider>
        </Stack>
      </CardContent>
      <br />
      <Paper>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            columns={[
              {
                field: "name",
                headerName: "Product Name",
                editable: false,
                flex: 1,
              },
              {
                field: "category",
                headerName: "Product Category",
                editable: false,
                flex: 1,
                valueGetter: GetProductCategoryName,
              },
              {
                field: "unit",
                headerName: "Product Unit",
                editable: false,
                flex: 1,
                valueGetter: GetProductUnitName,
              },
              {
                field: "description",
                headerName: "Product Description",
                editable: false,
                flex: 1,
                renderCell: (params) => (
                  <Tooltip title={params.value}>
                    <span>{params.value}</span>
                  </Tooltip>
                ),
              },
              {
                field: "status",
                headerName: "Product Status",
                editable: false,
                flex: 1,
                valueGetter: GetProductStatus,
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
                        onClick={() => handleEditProduct(params)}
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
            rows={isLoading || isError ? [] : productsData ? productsData.data : []}
            components={{ Toolbar: GridToolbar }}
          />
        </div>
      </Paper>
    </Card>
  );
};
export default ProductsDataTable;