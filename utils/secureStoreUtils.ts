import * as SecureStore from "expo-secure-store";

const MOVIE_ID_KEY = "saved";
export const setStoreData = async (movieId: number) => {
  const savedMovieIds = await getStoreData(MOVIE_ID_KEY);
  if (!savedMovieIds.includes(movieId)) {
    savedMovieIds.push(movieId);
    await SecureStore.setItemAsync(MOVIE_ID_KEY, JSON.stringify(savedMovieIds));
    await getStoreData(MOVIE_ID_KEY);
  }
};

export const getStoreData = async (key: string) => {
  const storeData = await SecureStore.getItemAsync(key);
  console.log(storeData);
  return storeData ? JSON.parse(storeData) : [];
};

export const RemoveMovieId = async (movieId: number) => {
  const savedMovieIds: number[] = await getStoreData(MOVIE_ID_KEY);
  const updatedMovieIds = savedMovieIds.filter((id) => id !== movieId);
  await SecureStore.setItemAsync(MOVIE_ID_KEY, JSON.stringify(updatedMovieIds));
};
