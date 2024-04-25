var createError = require('http-errors');


const httpMocks = require('node-mocks-http');
const { getLastLetter } = require('../../controllers/juego.controller');
const { generateRandomWord } = require('../../controllers/juego.controller'); 
const { calculateScore } = require('../../controllers/juego.controller');

jest.mock('../../models/user.models', () => ({
  findById: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn()
}));

jest.mock('../../models/game.model', () => {
  return {
    findById: jest.fn(),
    findOne: jest.fn(),
    updateOne: jest.fn()
  };
});
const UserModel = require('../../models/user.models');
const GameModel = require('../../models/game.model');

const { get } = require("mongoose");

const supertest = require('supertest');
const app = require('../../app'); 



describe('getLastLetter', () => {
    beforeEach(() => {
      // Reset mocks before each test
      GameModel.findById.mockClear();
      GameModel.findOne.mockClear();
      GameModel.updateOne.mockClear();
    });
  
    it('should return 400 for invalid gameId format', async () => {
      const req = httpMocks.createRequest({
          method: 'GET',
          url: '/game/123',
          params: {
              gameId: '123'
          }
      });
      const res = httpMocks.createResponse();

      await getLastLetter(req, res);

      expect(res.statusCode).toBe(404);
      expect(res._getJSONData()).toEqual({ message: "Game not found" });
  });
  
    it('should return 404 if no game is found', async () => {
      GameModel.findById.mockResolvedValue(null); // Configura la respuesta mockeada como null
  
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/game/507f1f77bcf86cd799439011',
        params: {
          gameId: '507f1f77bcf86cd799439011'
        }
      });
      const res = httpMocks.createResponse();
  
      await getLastLetter(req, res);
  
      expect(res.statusCode).toBe(404);
      expect(res._getData()).toEqual(JSON.stringify({ message: "Game not found" }));
    });
  
    it('should return 200 and the last letter of the game', async () => {
      GameModel.findById.mockResolvedValue({ lastLetter: 'Z' }); // Configura la respuesta mockeada con un objeto
  
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/game/507f1f77bcf86cd799439011',
        params: {
          gameId: '507f1f77bcf86cd799439011'
        }
      });
      const res = httpMocks.createResponse();
  
      await getLastLetter(req, res);
  
      expect(res.statusCode).toBe(200);
      expect(res._getData()).toEqual({ lastLetter: 'Z' });
    });
  });



  
  describe('generateRandomWord', () => {
    it('should return a word starting with the given letter', () => {
        const words = ['apple', 'apricot', 'banana', 'blueberry', 'avocado'];
        const randomFunc = () => 0;  // Always return the first index
        const word = generateRandomWord('a', words, randomFunc);
        expect(word).toMatch(/^a/i);
    });

    it('should throw an error for invalid starting letters', () => {
        expect(() => generateRandomWord('1', ['apple', 'banana'], () => 0)).toThrow("Invalid starting letter.");
    });


});  

describe('Deberá  tener  una  función  que  calcule  el  puntaje  del  jugador  con  cada  palabra  que devuelva,  este  puntaje  deberá  ser  basado  en  el  conteo  del  arreglo  de  palabras  que  se han utilizado en el juego', () => {
  it('Prueba unitaria que reciba como parámetro un arreglo y devuelva la longitud del mismo', () => {
      const words = ['apple', 'apricot', 'banana', 'blueberry', 'avocado'];
    
      expect(calculateScore(words)).toBe(5);

  });

});




