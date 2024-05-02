export interface Podcast {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
}

export interface PodcastDetails {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl?: string;
  episodes?: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  date: string;
  duration: string;
  imageUrl?: string;
}

export interface EpisodeResponse {
  trackId: string;
  trackName: string;
  releaseDate: string;
  trackTimeMillis: string;
}

export interface PodcastEntry {
  id: {
    attributes: {
      "im:id": string;
    };
  };
  title: {
    label: string;
  };
  "im:artist": {
    label: string;
  };
  "im:image": Array<{
    label: string;
  }>;
}
