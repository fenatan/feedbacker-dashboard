<template>
  <ModalFactory />
  <router-view />
</template>

<script>
import { watch } from '@vue/runtime-core';
import { useRoute, useRouter } from 'vue-router';
import services from './services';
import ModalFactory from './components/ModalFactory';
import { setCurrentUser } from './store/user';

export default {
  components: { ModalFactory },
  setup() {
    const router = useRouter();
    const route = useRoute();

    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem('token');

          if (!token) {
            router.push({ name: 'home' });
            return;
          }

          const { data } = await services.users.getMe();
          setCurrentUser(data);
        }
      }
    );
  },
};
</script>
