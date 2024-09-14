import axios from 'axios';

type CharactersType = {
  fullName: string;
  hogwartsHouse: string;
  interpretedBy: string;
  image: string;
  birthdate: string;
};

const characterListElement = document.getElementById('characters-list');

// Função para buscar os personagens da API usando Axios
const fetchCharacters = async (): Promise<CharactersType[]> => {
  try {
    const response = await axios.get<CharactersType[]>('https://potterapi-fedeperin.vercel.app/pt/characters');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    return [];
  }
};

// Função para exibir os personagens no HTML
const displayCharacters = async () => {
  const characters = await fetchCharacters();

  if (characters.length > 0) {
    characters.forEach((character, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h3>${index + 1}. ${character.fullName}</h3>
        <p>Casa: ${character.hogwartsHouse || 'Desconhecida'}</p>
        <p>Ator/Atriz: ${character.interpretedBy || 'Desconhecido'}</p>
        <p>Data de Nascimento: ${character.birthdate || 'Não informada'}</p>
        <img src="${character.image}" alt="${character.fullName}" width="100" />
      `;
      characterListElement?.appendChild(listItem);
    });
  } else {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Nenhum personagem encontrado.';
    characterListElement?.appendChild(emptyMessage);
  }
};

displayCharacters();