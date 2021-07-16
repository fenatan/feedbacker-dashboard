import mockAxios from 'axios';
import AuthService from './auth';

jest.mock('axios');

describe('AuthService', () => {
  afterEach(() => { jest.clearAllMocks(); });

  it('should return a token when user login', async () => {
    const token = '123';
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: { token } }));

    const response = await AuthService(mockAxios).login({ email: 'fe@gmail.com', password: '123' });
    expect(response.data).toHaveProperty('token');
    expect(response).toMatchSnapshot();
  });

  it('should return a user when user register', async () => {
    const user = {
      name: 'Test',
      password: '123',
      email: 'test@emila.com'
    };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data: user }));

    const response = await AuthService(mockAxios).register(user);
    expect(response.data).toHaveProperty('name');
    expect(response.data).toHaveProperty('password');
    expect(response.data).toHaveProperty('email');
    expect(response).toMatchSnapshot();
  });

  it('should return a error when there not found', async () => {
    const errors = { status: 404, statusText: 'Not Found' };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ request: errors }));

    const response = await AuthService(mockAxios).login({ email: 'fe@gmail.com', password: '123' });
    expect(response.errors).toHaveProperty('status');
    expect(response.errors).toHaveProperty('statusText');
    expect(response).toMatchSnapshot();
  });
});
