import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  TableBody,
  Table,
  Box,
  CardMedia,
  TableCell,
  TableRow,
  Grid,
} from "@mui/material";
import { Episode } from "../types";
import { usePodcastDetails } from "../services/usePodcastsDetails";

const PodcastDetail: React.FC = () => {
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
    <Grid container spacing={4} sx={{ p: 4 }}>
      <Grid item xs={12} md={8}>
        <Table>
          <TableBody>
            {podcastDetails.episodes.map((episode: Episode) => (
              <TableRow key={episode.id}>
                <TableCell>
                  <Link
                    to={{
                      pathname: `/podcast/${podcastId}/episode/${episode.id}`,
                    }}
                    state={{ imageUrl: podcastDetails.imageUrl }}
                  >
                    {episode.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(episode.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {Math.round(Number(episode.duration) / 60000)} min
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
};

export default PodcastDetail;
