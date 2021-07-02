import { ReactNode, useState } from "react";
import { PlayerContext } from "../contexts/PlayerContext";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerProviderProps = {
  children: ReactNode;
};

export const PlayerProvider = ({ children }: PlayerProviderProps) => {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeList, setCurrentEpisodeList] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const hasNext = isShuffling || currentEpisodeList + 1 < episodeList.length;
  const hasPrevious = currentEpisodeList > 0;

  const play = (episode: Episode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeList(0);
    setIsPlaying(true);
  };

  const playList = (list: Array<Episode>, index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeList(index);
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleLoop = () => setIsLooping(!isLooping);
  const toggleShuffle = () => setIsShuffling(!isShuffling);

  const setPlayingState = (state: boolean) => setIsPlaying(state);

  const playNext = () =>
    isShuffling
      ? setCurrentEpisodeList(Math.floor(Math.random() * episodeList.length))
      : hasNext && setCurrentEpisodeList(currentEpisodeList + 1);

  const playPrevious = () =>
    hasPrevious && setCurrentEpisodeList(currentEpisodeList - 1);

  const clearPlayerState = () => {
    setEpisodeList([]);
    setCurrentEpisodeList(0);
  };

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeList,
        isPlaying,
        play,
        togglePlay,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        isShuffling,
        toggleShuffle,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
