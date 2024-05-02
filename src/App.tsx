import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PodcastDetail from "./views/PodcastDetail";
import EpisodeDetail from "./views/EpisodeDetail";
import Header from "./components/Header";
import { Container } from "@mui/material";
import Layout from "./components/Layout";
import MainView from "./views/MainView";

function App() {
  return (
    <Router>
      <Container>
        <Header />

        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/" element={<Layout />}>
            <Route path="podcast/:podcastId" element={<PodcastDetail />} />
            <Route
              path="podcast/:podcastId/episode/:episodeId"
              element={<EpisodeDetail />}
            />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
