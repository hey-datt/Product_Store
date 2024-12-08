import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#ff7043", // Orange shade
        color: "white",
        textAlign: "center",
        py: 2,
        mt: "50px"
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        Product Store © {new Date().getFullYear()}
      </Typography>
      <Typography variant="body2">
        Designed by <strong>Ankush Datta</strong>. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
