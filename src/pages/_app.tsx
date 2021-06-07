import { Header } from "../components/Header";
import "../styles/global.scss";
import styles from "../styles/app.module.scss";
import { Player } from "../components/Player";
import { PlayerContext } from "../contexts/PlayContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeList, setCurrentEpisodeList] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = (episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeList(0);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const setPlayingState = (state: boolean) => setIsPlaying(state);

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeList,
        isPlaying,
        play,
        togglePlay,
        setPlayingState,
      }}
    >
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;
