export function mapMovieDetailsToMovie(details: MovieDetails): Movie {
  return {
    id: details.id,
    title: details.title,
    adult: details.adult,
    backdrop_path: details.backdrop_path ?? "",
    genre_ids: details.genres.map((g) => g.id), // transform object[] → number[]
    original_language: details.original_language,
    original_title: details.original_title,
    overview: details.overview ?? "",
    popularity: details.popularity,
    poster_path: details.poster_path ?? "",
    release_date: details.release_date,
    video: details.video,
    vote_average: details.vote_average,
    vote_count: details.vote_count,
  };
}
