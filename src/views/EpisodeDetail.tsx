import React from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { useEpisodeDetails } from "../services/usePodcastsDetails";

const EpisodeDetail: React.FC = () => {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const {
    data: episode,
    isLoading,
    error,
  } = useEpisodeDetails(podcastId ?? "", episodeId ?? "");
  const location = useLocation();
  const imageUrl = location.state?.imageUrl;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  if (error || !episode) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4">
          Error: {error ? error.message : "No episode details available."}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={4} sx={{ pl: 4 }}>
      <Grid item xs={12} md={8}>
        <Card sx={{ minHeight: 250 }}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h3">
              Description
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {episode.description}
            </Typography>
          </CardContent>
        </Card>
        <Box my={2}>
          <audio controls src={episode.audioUrl} style={{ width: "100%" }}>
            Your browser does not support the audio element.
          </audio>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EpisodeDetail;
