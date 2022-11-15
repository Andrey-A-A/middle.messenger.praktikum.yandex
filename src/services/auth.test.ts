import { authAPI } from '../api/auth';

describe('service/auth', () => {

  test('the data is peanut butter', async () => {
    const data = {
      login: 'Wind',
      password: '0619Wind',
    }
    const loginResponse: any = await authAPI.login(data);
    
    const meResp: any = await authAPI.me();
    const responseUser = meResp.response;

    expect(responseUser.id).toBe(80335);

  });
});