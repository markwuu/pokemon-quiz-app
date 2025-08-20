import { PokemonClient } from "pokenode-ts";
import pokemonJSON from "./pokemon.json";

export const getRandomPokemonSpecies = async () => {
  const randomInteger = Math.floor(Math.random() * 1025);
  const api = new PokemonClient();
  const pokemon = await api
    .getPokemonSpeciesById(randomInteger)
    .then((pokemon) => pokemon)
    .catch((error) => console.error(error));

  return pokemon;
};

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

const createPokemonQuestion = async () => {
  const randomNumbers = getRandomNonRepeatingIntegers(1, 1025, 4);
  const pokemonArray = [
    pokemonJSON[randomNumbers[0] - 1].name,
    pokemonJSON[randomNumbers[1] - 1].name,
    pokemonJSON[randomNumbers[2] - 1].name,
    pokemonJSON[randomNumbers[3] - 1].name,
  ];
  const answerIndex = getRandomInteger(0, 3);
  const pokemonNumber = randomNumbers[answerIndex];
  const pokemonName = await getPokemonNameById(pokemonNumber);

  const pokemonQuestion = {
    question: "Who's that pokemon?",
    image: `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`,
    options: pokemonArray,
    answer: answerIndex,
  };

  return pokemonQuestion;
};

export const createPokemonQuestionArray = async (numberOfQuestions: number) => {
  let pokemonQuestions = [];
  for (let i = 0; i < numberOfQuestions; i++) {
    pokemonQuestions.push(await createPokemonQuestion());
  }
  return pokemonQuestions;
};
