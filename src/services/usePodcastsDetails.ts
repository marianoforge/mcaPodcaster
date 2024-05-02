import { useQuery } from "@tanstack/react-query";
import { fetchFromAPI } from "./api"; // Importa la función común
import { EpisodeResponse, PodcastEntry } from "../types";

export const useEpisodeDetails = (podcastId: string, episodeId: string) => {
  return useQuery({
    queryKey: ["episodeDetails", podcastId, episodeId],
    queryFn: async () => {
      const data = await fetchFromAPI(
        `/lookup?id=${podcastId}&entity=podcastEpisode`
      );
      const foundEpisode = data.results.find(
        (ep: { trackId: { toString: () => string } }) =>
          ep.trackId.toString() === episodeId
      );

      if (foundEpisode) {
        return {
          id: foundEpisode.trackId,
          title: foundEpisode.trackName,
          description: foundEpisode.description,
          audioUrl: foundEpisode.previewUrl,
          releaseDate: foundEpisode.releaseDate,
        };
      }
      throw new Error("Episode not found");
    },
    enabled: !!podcastId && !!episodeId,
  });
};

export const usePodcastDetails = (podcastId: string) => {
  return useQuery({
    queryKey: ["podcastDetails", podcastId],
    queryFn: async () => {
      const data = await fetchFromAPI(
        `/lookup?id=${podcastId}&entity=podcastEpisode`
      );
      if (data.resultCount > 0) {
        const podcast = data.results[0];
        const episodes = data.results.slice(1);
        return {
          id: podcast.collectionId,
          title: podcast.collectionName,
          author: podcast.artistName,
          description: podcast.description,
          imageUrl: podcast.artworkUrl600,
          episodes: episodes.map((ep: EpisodeResponse) => ({
            id: ep.trackId,
            title: ep.trackName,
            date: ep.releaseDate,
            duration: ep.trackTimeMillis,
          })),
        };
      } else {
        throw new Error("No details found for the podcast");
      }
    },
    enabled: !!podcastId,
  });
};

export const usePodcastsApi = () => {
  return useQuery({
    queryKey: ["podcasts"],
    queryFn: async () => {
      const data = await fetchFromAPI(
        "/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      return data.feed.entry.map((entry: PodcastEntry) => ({
        id: entry.id.attributes["im:id"],
        title: entry.title.label,
        author: entry["im:artist"].label,
        imageUrl: entry["im:image"][2].label,
      }));
    },
  });
};
