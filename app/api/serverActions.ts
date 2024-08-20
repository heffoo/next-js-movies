"use server";

import { redirect } from "next/navigation";
import { moviesFx, requestFx, SignIn } from "./api";

export interface Movie {
  id: string;
  title: string;
  year: number;
  poster: string;
}

export const signIn = async (params: SignIn) => {
  await requestFx({
    path: "/signin",
    method: "POST",
    body: params,
  });
  redirect("/mainpage");
};

export const getMovies = async (params: { search: string }) => {
  try {
    const response = await moviesFx({
      path: "/movies",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params,
    });

    return {
      ...response,
      results: response.map((result: Movie) => {
        return {
          id: result.id,
          title: result.title,
          year: result.year,
          poster: result.poster,
        };
      }),
    };
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
};

export const getMovieById = async (id: string) => {
  try {
    const response = await moviesFx({
      path: `/movies/${id}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
};
