const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

const API_URL = 'https://starwars-n5ec-developuptcs-projects.vercel.app';

// Endpoint para obtener todos los personajes
app.get('/characters', async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/`);
    console.log('All characters:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching all characters:', error);
    res.status(500).json({ error: 'Error fetching characters' });
  }
});  

// Endpoint para buscar por ID
document.getElementById('fetchAll').addEventListener('click', async () => {
    try {
      const response = await fetch('/characters');
      const data = await response.json();
      
      // Verifica si el campo 'data' es un arreglo
      if (Array.isArray(data.data)) {
        displayResults(data.data); // Accede a la propiedad 'data'
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});