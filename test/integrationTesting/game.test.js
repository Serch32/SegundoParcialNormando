const GameModel = require("../../models/game.model").GameModel;
const UserModel = require("../../models/user.models").UserModel;
const ScoreboardModel = require("../../models/scoreboard.model").ScoreboardModel;

const { get } = require("mongoose");

const supertest = require('supertest');
const app = require('../../app'); 

describe(" La API deberá de cumplir con los siguientes servicios y validaciones", function() {
describe(" Deberá tener un registro de usuarios por medio del nombre, dicho servicio deberá devolver un identificador del usuario para utilizarlo en los siguientes servicios", function() {
    it.skip("Crear usuario", function(done) {
        const usuario = {
          usuarioName: "Pancho123"
        };
        
        supertest(app)
          .post('/users/')
          .send(usuario)
          .expect(201) 
          .end(function(err, res) {
            if (err) return done(err);
            // additional assertions can be made here
            done();
          });
      });
      it.skip('No debería aceptar nombres con caracteres especiales', async () => {
        const response = await supertest(app)
          .post('/users/')
          .send({ usuarioName: 'Usuario@123' })
          .expect(500); 
        expect(response.body.error).toBeDefined();
      });
    });


    describe("Deberá tener un servicio jugar donde se le envié como parámetros el id del usuario y una palabra, la cual iniciará el juego", () => {
        it.skip(' Deberá tener una prueba de integración que valide el envío del id del usuario y una palabra, la cual solo deberá contener letras', async () => {
    
    const response = await supertest(app)
      .post('/game/play')
      .send({ userId: "6626d63c0a19c34820c5f13f", word: "obo" })
      .expect(200); // Expecting a 200 OK status if the word is correct and the game continues

      expect(response.body.message).toBe("Correct! Continue playing.");
      expect(response.body.game).toBeDefined();
    });

    it.skip('should only accept words containing letters', async () => {
      const response = await supertest(app)
        .post('/game/play')
        .send({ userId: "6626d63c0a19c34820c5f13f", word: "111" })
        .expect(400); // Expecting a 400 error status if the word is incorrect because it doesn't contain only letters
  
      // Asserting that the response body contains the specific error message for invalid words
      expect(response.body.message).toBe("Invalid word! Game over.");
    });

    it.skip('Deberá  validar  la  respuesta  del  servicio  en  el  juego  en  curso,  es  decir  que siempre que el juego siga en curso devuelva una palabra', async () => {
      
      const response = await supertest(app)
        .post('/game/play')
        .send({ userId: "6626d63c0a19c34820c5f13f", word: "obo" }) 
        .expect(200); 

      expect(response.body.message).toBe("Correct! Continue playing.");
      expect(response.body.game).toBeDefined();
      expect(response.body.game.currentWord).toBeDefined();
    });

    it.skip('should handle delayed response correctly', async () => {
      jest.useRealTimers();
    
      const promise = supertest(app)
        .post('/game/play')
        .send({ userId: "662711310bf22995a8e4b186", word: "r" })
        
    
      jest.advanceTimersByTime(20000); // Simulate 20-second delay
    
      const response = await promise; // Await the promise only after the timer advance
      
      
      console.log(response.body);

      expect(response.status).toBe(200);
      expect(response.body.correctWordsCount).toBeDefined();
      expect(response.body.position).toBeDefined();
      expect(response.body.message).toBe("Time's up! Game over.");
    
      jest.useRealTimers();
    });

    it('Deberá  tener  un  servicio  que  obtenga  las  primeras  diez  posiciones  junto  con  sus puntajes', async () => {
    
      const response = await supertest(app)
        .get('/scoreboard/getTopPlayers')
        
        .expect(200); // Expecting a 200 OK status if the word is correct and the game continues
      console.log(response.body);
        expect(response.body.length).toBe(5);
        
      });
  });
  describe("Deberá  tener  una  función  que  obtenga  la  última  letra  de  la  palabra  enviada  como parámetro", () => {
    it.skip(' Deberá tener una prueba de integración que valide el envío del id del usuario y una palabra, la cual solo deberá contener letras', async () => {

const response = await supertest(app)
  .post('/game/play')
  .send({ userId: "6626d63c0a19c34820c5f13f", word: "obo" })
  .expect(200); // Expecting a 200 OK status if the word is correct and the game continues

  expect(response.body.message).toBe("Correct! Continue playing.");
  expect(response.body.game).toBeDefined();
});

it.skip('should only accept words containing letters', async () => {
  const response = await supertest(app)
    .post('/game/play')
    .send({ userId: "6626d63c0a19c34820c5f13f", word: "111" })
    .expect(400); // Expecting a 400 error status if the word is incorrect because it doesn't contain only letters

  // Asserting that the response body contains the specific error message for invalid words
  expect(response.body.message).toBe("Invalid word! Game over.");
});
});
  
    





});