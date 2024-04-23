const express = require('express');
const router = express.Router();

const gameController = require('../controllers/juego.controller');

// Ruta para crear un nuevo juego
router.post('/new-game', gameController.createGame);

// Ruta para procesar una jugada en un juego existente
router.post('/play', gameController.playGame);

router.get('/get/:gameId', gameController.getLastLetter);

module.exports = router;

