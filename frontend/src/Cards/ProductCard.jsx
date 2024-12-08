import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  Rating,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Modal,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const ProductCard = ({ id, image, name, price }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [updatedFields, setUpdatedFields] = useState({
    name,
    price,
    image,
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        return {
          success: false,
          message: data.message,
        };
      }
      setTimeout(() => {
        setSnackBar({
          open: true,
          severity: "success",
          message: `SUCCESSFULLY DELETED PRODUCT`,
        });
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log("ERROR DELETING DATA", error.message);
      setSnackBar({
        open: true,
        severity: "error",
        message: `REQUEST DELAYED`,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const data = await response.json();
      if (data.success) {
        setSnackBar({
          open: true,
          severity: "success",
          message: `Product successfully updated.`,
        });
        setModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      setSnackBar({
        open: true,
        severity: "error",
        message: `Error updating product.`,
      });
    }
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          height: "100%",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          "&:hover": {
            transform: "scale(1.03)",
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        {console.log("ID", id)}
        {/* Product Image */}
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={name}
          sx={{
            borderRadius: "12px 12px 0 0",
            objectFit: "cover",
          }}
        />

        {/* Product Details */}
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Price: ₹{price}
          </Typography>

          {/* Rating */}
          {/* <Rating
            name="read-only"
            value={Math.floor(Math.random() * 5) + 1}
            readOnly
            size="small"
            sx={{ mb: 2 }}
          /> */}

          {/* Action Buttons */}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}
          >
            <IconButton
              color="error"
              onClick={() => handleDelete(id)}
              sx={{
                backgroundColor: "#ffe6e6",
                "&:hover": { backgroundColor: "#ffcccc" },
              }}
            >
              <Delete />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => setModalOpen(true)}
              sx={{
                backgroundColor: "#e6f7ff",
                "&:hover": { backgroundColor: "#ccefff" },
              }}
            >
              <Edit />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="update-product-modal"
        aria-describedby="update-product-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "12px",
          }}
        >
          <Typography
            id="update-product-modal"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            Update Product
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={updatedFields.name}
            onChange={(e) =>
              setUpdatedFields({ ...updatedFields, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={updatedFields.price}
            onChange={(e) =>
              setUpdatedFields({ ...updatedFields, price: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Image"
            value={updatedFields.image}
            onChange={(e) =>
              setUpdatedFields({ ...updatedFields, image: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}
          >
            <Button
              onClick={() => setModalOpen(false)}
              variant="outlined"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              variant="contained"
              sx={{
                backgroundColor: "#4caf50", // Green shade
                "&:hover": { backgroundColor: "#388e3c" },
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>

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

export default ProductCard;
