import { PokemonClient } from "pokenode-ts";
import pokemonJSON from "./pokemon.json";

export const getRandomNonRepeatingIntegers = (
  min: number,
  max: number,
  count: number
) => {
  if (count > max - min + 1) {
    console.warn("Cannot generate more unique numbers than the range allows.");
    return [];
  }

  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers.slice(0, count);
};

export const getRandomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getPokemonNameById = async (pokemonNumber: number) => {
  const api = new PokemonClient();
  const pokemon = await api
    .getPokemonSpeciesById(pokemonNumber)
    .then((pokemon) => pokemon)
    .catch((error) => console.error(error));

  return pokemon?.name;
};

export const getPokemonCryByName = async (pokemonName: string) => {
  const api = new PokemonClient();
  const pokemonCry = await api
    .getPokemonByName(pokemonName)
    .then((pokemon: any) => {
      return pokemon?.cries?.latest;
    })
    .catch((error) => console.error(error));

  return pokemonCry;
};

const createPokemonQuestion = async (difficulty: string) => {
  const randomNumbers = getRandomNonRepeatingIntegers(1, 1025, 4);
  const pokemonArray = [
    pokemonJSON[randomNumbers[0] - 1].name,
    pokemonJSON[randomNumbers[1] - 1].name,
    pokemonJSON[randomNumbers[2] - 1].name,
    pokemonJSON[randomNumbers[3] - 1].name,
  ];
  const answerIndex = getRandomInteger(0, 3);
  const pokemonNumber = randomNumbers[answerIndex];
  let pokemonName;
  let pokemonCry;

  if (difficulty === "Hard") {
    pokemonCry = await getPokemonCryByName(pokemonArray[answerIndex]);
  } else {
    pokemonName = await getPokemonNameById(pokemonNumber);
  }

  const pokemonQuestion = {
    question: "Who's that pokemon?",
    image: pokemonName
      ? `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`
      : null,
    options: pokemonArray,
    answer: answerIndex,
    cry: pokemonCry,
    name: pokemonArray[answerIndex],
  };

  return pokemonQuestion;
};

export const createPokemonQuestionArray = async (
  numberOfQuestions: number,
  difficulty: string
) => {
  let pokemonQuestions = [];
  for (let i = 0; i < numberOfQuestions; i++) {
    pokemonQuestions.push(await createPokemonQuestion(difficulty));
  }
  return pokemonQuestions;
};
