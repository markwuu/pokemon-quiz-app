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
  const pokemonName = await api
    .getPokemonSpeciesById(pokemonNumber)
    .then((pokemon) => pokemon.varieties[0].pokemon.name)
    .catch((error) => console.error(error));

  return pokemonName;
};

const versions = [
  "red",
  "blue",
  "yellow",
  "gold",
  "silver",
  "crystal",
  "ruby",
  "sapphire",
  "emerald",
  "firered",
  "leafgreen",
  "diamond",
  "pearl",
  "platinum",
  "heartgold",
  "soulsilver",
  "black",
  "black",
  "white",
  "white",
  "black-2",
  "white-2",
  "x",
  "y",
  "omega-ruby",
  "alpha-sapphire",
  "sun",
  "moon",
  "ultra-sun",
  "lets-go-pikachu",
  "lets-go-eevee",
  "sword",
  "shield",
  "legends-arceus",
];

export const getPokemonDescriptionByName = async (pokemonName: string) => {
  const api = new PokemonClient();
  const pokemonDescription = await api
    .getPokemonSpeciesByName(pokemonName)
    .then((pokemon: any) => {
      const name = pokemon.name;
      const regEx = new RegExp(name, "i");
      let description;
      const randomVersion = versions[getRandomInteger(0, 33)];
      pokemon.flavor_text_entries.forEach((text: any) => {
        if (
          text.language.name === "en" &&
          text.version.name === randomVersion
        ) {
          description = text.flavor_text
            .replace(/[\n\f]/g, " ")
            .replace(regEx, "*******");
        }
      });
      return description;
    })
    .catch((error) => console.error(error));

  return pokemonDescription;
};

const createPokemonQuestion = async (difficulty: string) => {
  const randomNumbers = getRandomNonRepeatingIntegers(1, 151, 4);
  const pokemonArray = [
    pokemonJSON[randomNumbers[0] - 1].alternateForms[0],
    pokemonJSON[randomNumbers[1] - 1].alternateForms[0],
    pokemonJSON[randomNumbers[2] - 1].alternateForms[0],
    pokemonJSON[randomNumbers[3] - 1].alternateForms[0],
  ];
  const answerIndex = getRandomInteger(0, 3);
  const pokemonNumber = randomNumbers[answerIndex];
  let pokemonName;
  let pokemonDescription;

  const pokemonNamesWithDuplicates = [
    pokemonJSON[pokemonNumber - 1].name,
    ...pokemonJSON[pokemonNumber - 1].alternateForms,
  ];
  const alternateNames = pokemonNamesWithDuplicates.filter(
    (item, index) => pokemonNamesWithDuplicates.indexOf(item) === index
  );

  if (difficulty === "Hard") {
    pokemonDescription = await getPokemonDescriptionByName(
      pokemonArray[answerIndex]
    );
  } else {
    pokemonName = await getPokemonNameById(pokemonNumber);
  }

  if (pokemonName === "maushold-family-of-four") {
    pokemonName = "maushold-family4";
  } else if (pokemonName === "morpeko") {
    pokemonName = "morpeko-full-belly";
  } else if (pokemonName === "mimikyu-disguised") {
    pokemonName = "mimikyu";
  } else if (pokemonName === "mr. mime") {
    pokemonName = "mr-mime";
  }

  const pokemonQuestion = {
    question: "Who's that pokemon?",
    image: pokemonName
      ? `https://img.pokemondb.net/artwork/large/${pokemonName}.jpg`
      : null,
    options: pokemonArray,
    answer: answerIndex,
    cry: "",
    name: pokemonArray[answerIndex],
    id: pokemonNumber,
    alternateNames,
    description: pokemonDescription,
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

export const encodeHTML = (s: string) => {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;"); // For single quotes
};
