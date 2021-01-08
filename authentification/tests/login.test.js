const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000'; // Modify to .env

describe('Deve ter o endpoint POST `/login`', () => {
  beforeEach(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it.skip('Será validado que é possível fazer login com sucesso', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'user1@gmail.com',
          password: '123',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email e senha validos');
      });
  });

  it.skip('Será validado que não é possível fazer login sem o campo `email`', async () => {
    await frisby
      .post(`${url}/login`,
        {
          password: '123456',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"email" is required');
      });
  });

  it.skip('Será validado que não é possível fazer login sem o campo `password`', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'user1@gmail.com',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('"password" is required');
      });
  });

  it.skip('Será validado que não é possível fazer login com um usuário que não existe', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'user567894@gmail.com',
          password: '123456',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Campos inválidos');
      });
  });
});
