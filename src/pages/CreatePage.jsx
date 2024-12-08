import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { callAPI } from "../Services/apiServices";
// import { ConfigApiMethods, ConfigApiURL } from "../Config/Config";

const CreatePage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [snackbar, setSnackBar] = useState({
    open: false,
    severity: "error",
    message: "",
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({ ...snackbar, open: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setSnackBar({
        open: true,
        severity: "success",
        message: `SUCCESSFULLY CREATED PRODUCT`,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);

      //   const response = await callAPI(
      //     ConfigApiURL.addProduct,
      //     ConfigApiMethods.postMethod,
      //     formData
      //   );
      //   console.log("FORM DATA", response);
      //   if (!response.ok) {
      //     throw new Error(`Error: ${response.statusText}`);
      //   }
      setFormData({
        name: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.log("Error fetching data", error.message);
      setSnackBar({
        open: true,
        severity: "error",
        message: `REQUEST DELAYED`,
      });
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 5,
            p: 3,
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Form Title */}
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}
          >
            CREATE PRODUCT
          </Typography>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              variant="outlined"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Image URL"
              name="image"
              variant="outlined"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              sx={{ mb: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="warning"
              sx={{ mt: 3, width: "100%" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%", wordBreak: "break-all" }}
        >
          <div>{snackbar.message}</div>
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreatePage;
