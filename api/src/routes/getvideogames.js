const express = require('express');
const router = express.Router();

const { Videogame, Genre } = require('../db.js');


app.get('/videogames', async (req, res) => {
    try {
      const videoGames = await Videogame.findAll();
      res.json(videoGames);
    } catch (error) {
      console.error('Error al obtener los videojuegos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  app.get('/videogames/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const videoGame = await Videogame.findByPk(id);
      if (videoGame) {
        res.json(videoGame);
      } else {
        res.status(404).json({ error: 'Videojuego no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el videojuego:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });
  app.get( '/videogames/name?=', async (req,res) => {
      try {
          const { name } = req.query;
          const videogame = await Videogame.findAll({
              where: {
                  name: name
                }
            });
            res.json(videogame);
        } catch (error) {
            console.error('Error al obtener el videojuego:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })
    app.post('/videogames', async (req, res) => {
        try {
        const { name, description, released, rating, platforms, genres } = req.body;
        const videogame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            genres,
        });
        res.json(videogame);
        } catch (error) {
        console.error('Error al crear el videojuego:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
    app.get('genres', async (req,res) => {
        try {
            const genres = await Genre.findAll();
            res.json(genres);
        } catch (error) {
            console.error('Error al obtener los generos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    })