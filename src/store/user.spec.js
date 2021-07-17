import useStore from '../hooks/useStore';
import { cleanCurrentUser, setCurrentUser, setApiKey } from './user';

describe('UserStore', () => {
  afterEach(() => {
    cleanCurrentUser();
  });

  it('should set current user', () => {
    const store = useStore();
    setCurrentUser({ name: 'João' });

    expect(store.User.currentUser.name).toBe('João');
  });

  it('should set api key', () => {
    const store = useStore();
    setApiKey('123');

    expect(store.User.currentUser.apiKey).toBe('123');
  });

  it('should clean current user', () => {
    const store = useStore();
    setCurrentUser({ name: 'João' });
    cleanCurrentUser();

    expect(store.User.currentUser).toEqual({});
  });
});
