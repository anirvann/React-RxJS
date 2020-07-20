import React, { memo, useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import AppContext from './context';

const Song = (props) => {
  const { id, artistName, trackName, favourite } = props;
  const [appState, setAppState] = useState(null);
  let subscription;

  const favouriteClick = (ev) => {
    const songs = appState.songs.map((song) => ({
      ...song,
      ...{
        favourite:
          song.trackId == ev.currentTarget.id
            ? !song.favourite
            : song.favourite,
      },
    }));
    AppContext.updateState({
      songs,
      favouritesCount: songs.filter((song) => song.favourite).length,
    });
  };

  useEffect(() => {
    subscription = AppContext.subscribe(setAppState);
    AppContext.init();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <tr key={id}>
      <td>{artistName}</td>
      <td>{trackName}</td>
      <td>
        <button id={id} onClick={favouriteClick}>
          {favourite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </td>
    </tr>
  );
};

export default memo(Song);
