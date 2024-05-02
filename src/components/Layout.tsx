// Layout.tsx
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { usePodcastDetails } from "../services/usePodcastsDetails";

const Layout: React.FC = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const {
    data: podcastDetails,
    isLoading,
    error,
  } = usePodcastDetails(podcastId ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !podcastDetails) {
    return <div>Error: {error ? error.message : "No data available."}</div>;
  }

  return (
    <Box display="flex" mt={3}>
      <Card sx={{ pr: 2 }}>
        <CardMedia
          component="img"
          image={podcastDetails.imageUrl}
          alt={podcastDetails.title}
        />
        <CardContent>
          <Typography variant="h5">{podcastDetails.title}</Typography>
          <Typography variant="subtitle1">{podcastDetails.author}</Typography>
          <Typography variant="body2">
            {!podcastDetails.description && "No Description"}
          </Typography>
        </CardContent>
      </Card>
      <Outlet /> {/* Aquí se renderizarán los componentes cambiantes */}
    </Box>
  );
};

export default Layout;
