document.addEventListener('DOMContentLoaded', () => {
    const fetchAllBtn = document.getElementById('fetchAll');
    const fetchByIdBtn = document.getElementById('fetchById');
    const fetchByNameBtn = document.getElementById('fetchByName');
    const characterIdInput = document.getElementById('characterId');
    const characterNameInput = document.getElementById('characterName');
    const resultsDiv = document.getElementById('results');
  
    fetchAllBtn.addEventListener('click', fetchAllCharacters);
    fetchByIdBtn.addEventListener('click', fetchCharacterById);
    fetchByNameBtn.addEventListener('click', fetchCharacterByName);
  
    async function fetchAllCharacters() {
        resultsDiv.innerHTML = '<p>Cargando personajes...</p>';
        try {
            const response = await fetch('/characters');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Received data:', data); // Para depuración
            
            if (Array.isArray(data)) {
                displayResults(data);
            } else if (data.data && Array.isArray(data.data)) {
                displayResults(data.data);
            } else {
                throw new Error('Formato de datos inesperado');
            }
        } catch (error) {
            console.error('Error al obtener los personajes:', error);
            resultsDiv.innerHTML = '<p>Error al cargar los personajes. Por favor, intente de nuevo.</p>';
        }
    }
  
    async function fetchCharacterById() {
        const id = characterIdInput.value.trim();
        if (!id) {
            resultsDiv.innerHTML = '<p>Por favor, ingrese un ID</p>';
            return;
        }

        resultsDiv.innerHTML = '<p>Buscando personaje...</p>';
        try {
            const response = await fetch(`/characters/${encodeURIComponent(id)}`);
            const data = await response.json();
            
            if (response.ok && data.data) {
                displayResults([data.data]);
            } else {
                resultsDiv.innerHTML = `<p>${data.message || 'Personaje no encontrado'}</p>`;
            }
        } catch (error) {
            console.error('Error al buscar personaje por ID:', error);
            resultsDiv.innerHTML = '<p>Error al buscar el personaje</p>';
        }
    }
  
    async function fetchCharacterByName() {
        const name = characterNameInput.value.trim();
        if (!name) {
            resultsDiv.innerHTML = '<p>Por favor, ingrese un nombre</p>';
            return;
        }

        resultsDiv.innerHTML = '<p>Buscando personaje...</p>';
        try {
            const response = await fetch(`/characters/name/${encodeURIComponent(name)}`);
            const data = await response.json();
            
            if (response.ok && data.data) {
                displayResults(Array.isArray(data.data) ? data.data : [data.data]);
            } else {
                resultsDiv.innerHTML = `<p>${data.message || 'No se encontraron personajes'}</p>`;
            }
        } catch (error) {
            console.error('Error al buscar personajes por nombre:', error);
            resultsDiv.innerHTML = '<p>Error al buscar personajes</p>';
        }
    }
  
    function displayResults(characters) {
        resultsDiv.innerHTML = '';

        if (!characters || characters.length === 0) {
            resultsDiv.innerHTML = '<p>No se encontraron personajes.</p>';
            return;
        }

        characters.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.innerHTML = `
                <h3>${character.name || 'Desconocido'}</h3>
                <p>ID: ${character._id || character.id || 'Desconocido'}</p>
                <p>Especie: ${character.species || 'Desconocida'}</p>
                <p>Género: ${character.gender || 'Desconocido'}</p>
                <p>Altura: ${character.height || 'Desconocida'}</p>
                <p>Peso: ${character.mass || 'Desconocido'}</p>
                <p>Color de pelo: ${character.hair_color || 'Desconocido'}</p>
                <p>Color de piel: ${character.skin_color || 'Desconocido'}</p>
                <p>Color de ojos: ${character.eye_color || 'Desconocido'}</p>
                <p>Año de nacimiento: ${character.birth_year || 'Desconocido'}</p>
                <p>Planeta natal: ${character.homeworld || 'Desconocido'}</p>
            `;
            resultsDiv.appendChild(characterDiv);
        });
    }
});