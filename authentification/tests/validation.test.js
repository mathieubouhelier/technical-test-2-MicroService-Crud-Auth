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
      .post(`${url}/validation`,
        {
          email: 'user1@gmail.com',
          authNumber: 1111,
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

// add test of TOKEN

  });

  // it('Será validado que não é possível fazer login sem o campo `email`', async () => {
  //   await frisby
  //     .post(`${url}/login`,
  //       {
  //         password: '123456',
  //       })
  //     .expect('status', 400)
  //     .then((response) => {
  //       const { body } = response;
  //       const result = JSON.parse(body);
  //       expect(result.message).toBe('"email" is required');
  //     });
  // });

  // it('Será validado que não é possível fazer login sem o campo `password`', async () => {
  //   await frisby
  //     .post(`${url}/login`,
  //       {
  //         email: 'user1@gmail.com',
  //       })
  //     .expect('status', 400)
  //     .then((response) => {
  //       const { body } = response;
  //       const result = JSON.parse(body);
  //       expect(result.message).toBe('"password" is required');
  //     });
  // });

  // it('Será validado que não é possível fazer login com um usuário que não existe', async () => {
  //   await frisby
  //     .post(`${url}/login`,
  //       {
  //         email: 'user567894@gmail.com',
  //         password: '123456',
  //       })
  //     .expect('status', 400)
  //     .then((response) => {
  //       const { body } = response;
  //       const result = JSON.parse(body);
  //       expect(result.message).toBe('Campos inválidos');
  //     });
  // });
});
