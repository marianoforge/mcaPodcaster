import React, { useEffect, useState } from "react";
import { usePodcastsApi } from "../services/usePodcastsDetails";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import { Podcast } from "../types";

const MainView: React.FC = () => {
  const { data: podcasts, isLoading } = usePodcastsApi();
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (podcasts) {
      setFilteredPodcasts(podcasts);
    }
  }, [podcasts]);

  useEffect(() => {
    if (podcasts) {
      const filtered = filter
        ? podcasts.filter(
            (p: Podcast) =>
              p.title.toLowerCase().includes(filter.toLowerCase()) ||
              p.author.toLowerCase().includes(filter.toLowerCase())
          )
        : podcasts;
      setFilteredPodcasts(filtered);
    }
  }, [filter, podcasts]);

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

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <TextField
        fullWidth
        label="Filter podcasts..."
        variant="outlined"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ marginBottom: 3 }}
      />
      <Grid container spacing={2}>
        {filteredPodcasts?.map((podcast) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={podcast.id}>
            <Card sx={{ maxWidth: 345, minHeight: 350, maxHeight: 350 }}>
              <CardMedia
                component="img"
                height="140"
                image={podcast.imageUrl}
                alt={podcast.title}
              />
              <CardContent>
                <Link
                  to={`/podcast/${podcast.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {podcast.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Author: {podcast.author}
                  </Typography>

                  <Typography variant="body2" color="primary">
                    Listen Now
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MainView;
