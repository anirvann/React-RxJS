import { combineLatest, BehaviorSubject } from "rxjs";

const songs = new BehaviorSubject([]);
const totalSongs = new BehaviorSubject(0);
const favouritesCount = new BehaviorSubject(0);

const subject = combineLatest(
  songs,
  totalSongs,
  favouritesCount,
  (songs, totalSongs, favouritesCount) => ({
    songs,
    totalSongs,
    favouritesCount,
  })
);

const setSongs = (songList) => songs.next(songList);
const setTotalSongs = (songsCount) => totalSongs.next(songsCount);
const setFavouritesCount = (favCount) => favouritesCount.next(favCount);

const AppContext = {
  subscribe: (setState) => subject.subscribe(setState),
  setSongs,
  setTotalSongs,
  setFavouritesCount,
};

export default AppContext;
