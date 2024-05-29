import React from 'react';
import "./index.css";
import App from "./App";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';            
import Typography from '@mui/material/Typography';

function CopyRight() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      fsoftwareengineer, {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class AppRouter extends React.Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<App />} />
               </Routes>
            </div>
            <div>
                <Box mt={5}>
                    <CopyRight />
                </Box>
            </div>
        </BrowserRouter>
        );
    }
}

export default AppRouter;   