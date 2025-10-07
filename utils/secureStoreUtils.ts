import AsyncStorage from "@react-native-async-storage/async-storage";

const MOVIE_KEY = "savedMovies";

export const getStoreData = async (): Promise<Movie[]> => {
  try {
    const data = await AsyncStorage.getItem(MOVIE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load movies:", e);
    return [];
  }
};

export const setStoreData = async (movie: Movie): Promise<void> => {
  try {
    const savedMovies = await getStoreData();
    // Check if movie already exists by ID
    const alreadySaved = savedMovies.some((m) => m.id === movie.id);
    if (!alreadySaved) {
      const updatedMovies = [...savedMovies, movie];
      await AsyncStorage.setItem(MOVIE_KEY, JSON.stringify(updatedMovies));
    }
  } catch (e) {
    console.error("Failed to save movie:", e);
  }
};
export const removeMovie = async (movieId: number): Promise<void> => {
  try {
    const savedMovies = await getStoreData();
    const updatedMovies = savedMovies.filter((m) => m.id !== movieId);
    await AsyncStorage.setItem(MOVIE_KEY, JSON.stringify(updatedMovies));
  } catch (e) {
    console.error("Failed to remove movie:", e);
  }
};
export const isMovieSaved = async (movieId: number): Promise<boolean> => {
  try {
    const savedMovies = await getStoreData();
    return savedMovies.some((m) => m.id === movieId);
  } catch (e) {
    console.error("Failed to check movie:", e);
    return false;
  }
};
