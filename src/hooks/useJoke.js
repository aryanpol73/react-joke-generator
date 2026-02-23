import { useReducer, useRef } from "react";
import { fetchJokeFromAPI } from "../services/jokeService";

const initialState = {
  joke: null,
  loading: false,
  error: null,
};

function jokeReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, joke: action.payload };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

export const useJoke = () => {
  const [state, dispatch] = useReducer(jokeReducer, initialState);

  // Cache structure:
  // {
  //   Programming: { jokes: [], index: number },
  //   Dark: { jokes: [], index: number }
  // }
  const cacheRef = useRef({});

  const fetchJoke = async (category = "Programming") => {
    dispatch({ type: "FETCH_START" });

    try {
      if (!cacheRef.current[category]) {
        cacheRef.current[category] = {
          jokes: [],
          index: -1,
        };
      }

      const categoryData = cacheRef.current[category];

      let jokeData;
      let isDuplicate = true;

      // Try up to 5 times to avoid duplicates
      for (let i = 0; i < 5 && isDuplicate; i++) {
        const newJoke = await fetchJokeFromAPI(category);

        isDuplicate = categoryData.jokes.some(
          (j) =>
            j.setup === newJoke.setup &&
            j.punchline === newJoke.punchline
        );

        if (!isDuplicate) {
          jokeData = newJoke;
        }
      }

      // If still duplicate after retries, accept last fetch
      if (!jokeData) {
        jokeData = await fetchJokeFromAPI(category);
      }

      categoryData.jokes.push(jokeData);
      categoryData.index = categoryData.jokes.length - 1;

      dispatch({
        type: "FETCH_SUCCESS",
        payload: jokeData,
      });

    } catch (error) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "Failed to fetch joke. Try again.",
      });
    }
  };

  const goToPrevious = (category) => {
    const categoryData = cacheRef.current[category];
    if (!categoryData) return false;

    if (categoryData.index <= 0) return false;

    categoryData.index -= 1;

    dispatch({
      type: "FETCH_SUCCESS",
      payload: categoryData.jokes[categoryData.index],
    });

    return true;
  };

  return {
    joke: state.joke,
    loading: state.loading,
    error: state.error,
    fetchJoke,
    goToPrevious,
  };
};