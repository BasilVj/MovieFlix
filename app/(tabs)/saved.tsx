import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getStoreData } from "@/utils/secureStoreUtils";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const Saved = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchDataFromLocalStorage = async () => {
    setIsLoading(true);
    const data = await getStoreData();
    setMovies(data);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchDataFromLocalStorage();
    }, [])
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {movies.length > 0 ? (
          <>
            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            ) : (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Saved Movies
                </Text>
                <FlatList
                  data={movies}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  scrollEnabled={false}
                  className="mt-2 pb-32"
                  renderItem={({ item }) => <MovieCard {...item} />}
                />
              </View>
            )}
          </>
        ) : (
          <View className="flex justify-center items-center h-[75%]">
            <Image source={icons.save} className="size-10" tintColor="#fff" />
            <Text className="text-gray-500 text-lg max-w-xs text-center">
              Your saved movies will appear here. Start by adding some!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Saved;
