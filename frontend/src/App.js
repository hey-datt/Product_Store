import { Box } from "@mui/material";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import CreatePage from "./pages/CreatePage";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Box sx={{minHeight: "100vh"}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
        <Footer />
      </Box>
    </>
  );
}

export default App;
