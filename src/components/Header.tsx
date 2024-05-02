import { AppBar, Toolbar, Typography, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Activar el indicador de carga al cambiar de ruta
    const handleRouteChange = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500); // Simular una carga, remover si usas cargas reales
    };

    // Escuchar cambios en la ubicación
    handleRouteChange(); // Llamar al cambiar la ruta
    return () => {
      // Limpiar si es necesario
    };
  }, [location]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Podcaster
          </Link>
        </Typography>
        {isLoading && <CircularProgress color="inherit" size={24} />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
