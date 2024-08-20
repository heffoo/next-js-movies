'use client'

import { getMovieById, Movie } from "@/app/api/serverActions";
import React, { useCallback, useEffect, useState } from "react";

const MovieItem = ({ params }: { params: { movieId: string } }) => {
  const [movie, setMovie] = useState<Movie>();

  const getMovie = useCallback(async () => {
    const response = await getMovieById(params.movieId);
    setMovie(response);
  }, [params.movieId]);

  useEffect(() => {
    getMovie();
  }, [getMovie]);

  return movie?.title;
};

export default MovieItem;
