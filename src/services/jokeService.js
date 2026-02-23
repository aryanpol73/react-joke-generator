export const fetchJokeFromAPI = async (category = "Programming") => {
  const response = await fetch(
    `https://v2.jokeapi.dev/joke/${category}?type=twopart`
  );

  const data = await response.json();

  if (data.type === "twopart") {
    return {
      setup: data.setup,
      punchline: data.delivery,
    };
  }

  return {
    setup: data.joke,
    punchline: "",
  };
};
        