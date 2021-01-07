const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000'; // Modify to .env

describe('Deve ter o endpoint GET `/user`', () => {
  beforeEach(async () => {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate $');
    shell.exec('npx sequelize-cli db:seed:all $');
  });

  it.skip('Será validado que é possível listar todos os usuários', async () => {
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
        expect(json[1].displayName).toBe('John Doe');
        expect(json[2].displayName).toBe('mathieu');
      });
  });

  it.skip('Será validado que não é possível listar todos os usuários com token invalido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/user`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Token não encontrado');
      });
  });

  it.skip('Será validado que é possível postar um usuário', async () => {
    await frisby
      .post(`${url}/user`, {
        displayName: 'user4ForTest',
        email: 'user4@gmail.com',
        password: '444444',
        authNumber: 4444,
      })
      .expect('status', 201)
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
        expect(json[3].displayName).toBe('user4ForTest');
        expect(json[3].email).toBe('user4@gmail.com');
        expect(json[3].password).toBe('444444');
        expect(json[3].authNumber).toBe(4444);
      });
  });

  it('Será validado que não é possível postar um usuário com displayName <6', async () => {
    await frisby
      .post(`${url}/user`, {
        displayName: 'user4',
        email: 'user4@gmail.com',
        password: '444444',
        authNumber: 4444,
      })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe(
          '"displayName" length must be at least 8 characters long',
        );
      });
  });

  it('Será validado que não é possível postar um usuário com email com formato errado ', async () => {
    await frisby
      .post(`${url}/user`, {
        displayName: 'user4ForTest',
        email: 'user4gmail.com',
        password: '444444',
        authNumber: 4444,
      })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe(
          '"email" must be a valid email',
        );
      });
  });

});
