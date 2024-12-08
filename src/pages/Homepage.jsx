import { Box, CircularProgress, Grid2, Typography,Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "../Cards/ProductCard";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  

  return (
    <>
      <Box
        sx={{
          p: 4,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {/* Page Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 4,
            textAlign: "center",
            color: "#ff7043", // Orange shade for the title
          }}
        >
          Welcome to the Product Store
        </Typography>

        {/* Loading Spinner */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid2 container spacing={4}>
            {/* Render Each Product */}
            {products.data?.map((product) => (
              <Grid2 item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  //   onDelete={handleDelete(product._id)}
                  //   onUpdate={handleUpdate}
                />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Box>
    </>
  );
};

export default Homepage;
