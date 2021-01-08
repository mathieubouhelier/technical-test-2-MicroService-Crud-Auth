const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000'; // Modify to .env

describe('Deve ter o endpoint POST `/validation`', () => {
  beforeEach(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it('Será validado que é possível fazer validation com sucesso', async () => {
    await frisby
      .post(`${url}/validation`, {
        email: 'user1@gmail.com',
        authNumber: 1111,
      })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json[0].displayName).toBe('user1');
      });
  });

  it('Será validado que não é possível validar sem o campo `email`', async () => {
    await frisby
    .post(`${url}/validation`, {
      authNumber: 1111,
    })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"email" is required');
      });
  });

  it('Será validado que não é possível validar sem o campo `authNumber`', async () => {
    await frisby
    .post(`${url}/validation`, {
      email: 'user1@gmail.com',
    })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"authNumber" is required');
      });
  });

  it('Será validado que não é possível validar com o campo `authNumber` errado', async () => {
    await frisby
    .post(`${url}/validation`, {
      email: 'user1@gmail.com',
      authNumber: 222,
    })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('dados inválidos');
      });
  });


});
