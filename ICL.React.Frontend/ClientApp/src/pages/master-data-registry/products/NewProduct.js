import React, {useEffect} from "react";
import styled from "@emotion/styled";
import {
  Box,
  Button as MuiButton,
  Card as MuiCard,
  CardContent as MuiCardContent, CircularProgress,
  Grid,
  Stack,
  TextField as MuiTextField,
  Typography,
} from "@mui/material";
import {spacing} from "@mui/system";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useNavigate, useParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getProductById, newProduct, updateProduct} from "../../../api/product";
import { toast } from "react-toastify";

const Card = styled(MuiCard)(spacing);
const CardContent = styled(MuiCardContent)(spacing);
const TextField = styled(MuiTextField)(spacing);
const Button = styled(MuiButton)(spacing);

const themeCustom = createTheme({
  palette: {
    custom_black: {
      main: "#000000",
      contrastText: "#FFFFFF",
    },
    custom_green: {
      main: "#23A295",
      contrastText: "#FFFFFF",
    }
  },
});

const NewProduct = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const mutation = useMutation({ mutationFn: newProduct });
  const updateMutation = useMutation({ mutationFn: updateProduct });

  const {
    data,
    isLoading,
    isError,
  } = useQuery(["getProductById", id], getProductById, {
    enabled: !!id,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      unit: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      category: Yup.string().required("Required"),
      unit: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm,  setSubmitting }) => {
      try {
        if (id) {
          values.id = id;
          await updateMutation.mutateAsync(values);
        } else {
          await mutation.mutateAsync(values);
        }
        toast("Successfully Created a Product", {
          type: "success",
        });
        navigate("/master-data-registry/products");
      } catch (error) {
        toast(error.response.data, {
          type: "error",
        });
      }
    }
  });

  useEffect(() => {
    function setCurrentFormValues() {
      if (!isLoading && !isError) {
        formik.setValues({
          name: data.data.name,
          category: data.data.category,
          unit: data.data.unit,
          description: data.data.description ? data.data.description : "",
        });
      }
    }
    setCurrentFormValues();
  }, [isLoading, isError, data]);

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Card mb={12}>
          <CardContent>
            {formik.isSubmitting ? (
              <Box display="flex" justifyContent="center" my={6}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Grid container spacing={12}>
                  <Grid item md={12}>
                    <Typography variant="h3" gutterBottom display="inline" sx={{ color: "#23A295;" }}>
                      Master Data Registry
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      New Product
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} mb={2}>
                  <Grid item md={6}>
                    <TextField
                      name="name"
                      label="Product Name"
                      value={formik.values.name}
                      error={Boolean(
                        formik.touched.name && formik.errors.name
                      )}
                      fullWidth
                      helperText={
                        formik.touched.name && formik.errors.name
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      variant="outlined"
                      my={2}
                    />
                  </Grid>

                  <Grid item md={6}>
                    <TextField
                      name="category"
                      label="Product Category"
                      select
                      value={formik.values.category}
                      error={Boolean(
                        formik.touched.category && formik.errors.category
                      )}
                      helperText={
                        formik.touched.category && formik.errors.category
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      variant="outlined"
                      fullWidth
                      my={2}
                    >
                      <MenuItem disabled value="">
                        Select Product Category
                      </MenuItem>
                      {/*{!isLoadingProductCategories && !isErrorProductCategories*/}
                      {/*  ? ProductCategories.data.map((option) => (*/}
                      {/*    <MenuItem key={option.id} value={option.id}>*/}
                      {/*      {option.name}*/}
                      {/*    </MenuItem>*/}
                      {/*  ))*/}
                      {/*  : []}*/}
                    </TextField>
                  </Grid>

                  <Grid item md={6}>
                    <TextField
                      name="unit"
                      label="Product Unit"
                      select
                      value={formik.values.unit}
                      error={Boolean(
                        formik.touched.unit && formik.errors.unit
                      )}
                      helperText={
                        formik.touched.unit && formik.errors.unit
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      variant="outlined"
                      fullWidth
                      my={2}
                    >
                      <MenuItem disabled value="">
                        Select Product Unit
                      </MenuItem>
                      {/*{!isLoadingProductUnits && !isErrorProductUnits*/}
                      {/*  ? ProductUnits.data.map((option) => (*/}
                      {/*    <MenuItem key={option.id} value={option.id}>*/}
                      {/*      {option.name}*/}
                      {/*    </MenuItem>*/}
                      {/*  ))*/}
                      {/*  : []}*/}
                    </TextField>
                  </Grid>

                  <Grid item md={6}>
                    <TextField
                      name="description"
                      label="Description"
                      value={formik.values.description}
                      error={Boolean(
                        formik.touched.description && formik.errors.description
                      )}
                      fullWidth
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      multiline
                      variant="outlined"
                      rows={3}
                      my={2}
                    />
                  </Grid>
                </Grid>
                <Stack direction="row" justifyContent="flex-end" alignItems="flex-end" spacing={2}>
                  <ThemeProvider theme={themeCustom}>
                    <Button type="submit" variant="contained" color="custom_black" onClick={() => navigate("/master-data-registry/products")}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="custom_green">
                      Save New Product
                    </Button>
                  </ThemeProvider>
                </Stack>
              </>
            )}
          </CardContent>
        </Card>
      </form>
    </React.Fragment>
  );
};
export default NewProduct;