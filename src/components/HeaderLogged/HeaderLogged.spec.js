import { shallowMount } from '@vue/test-utils';
import { createWebHistory, createRouter } from 'vue-router';
import HeaderLogged from '.';
import { routes } from '../../router';

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

const mockStore = { currentUser: {} };

jest.mock('../../hooks/useStore', () => () => mockStore);

describe('<HeaderLogged />', () => {
  it('should render header logged correctly', async () => {
    router.push('/');
    await router.isReady();
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render 3 dots when there is no user logged', async () => {
    router.push('/');
    await router.isReady();
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    });

    const buttonLogout = wrapper.find('#logout-button');
    expect(buttonLogout.text()).toBe('...');
  });

  it('should render user name when there is user logged', async () => {
    router.push('/');
    await router.isReady();

    mockStore.currentUser.name = 'FakeUserName';

    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    });

    const buttonLogout = wrapper.find('#logout-button');
    expect(buttonLogout.text()).toBe('FakeUserName (sair)');
  });
});
