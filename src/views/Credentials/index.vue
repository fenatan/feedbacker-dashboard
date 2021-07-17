<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </div>

  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font0-black text-center text-gray-800">
      Credenciais
    </h1>

    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col max-w-6xl py-10 w-4/5">
      <h1 class="text-3xl font-black text-brand-darkgray">Instalação e configuração</h1>

      <p class="mt-10 text-lg text-gray-800 font-regular">
        Essa aqui é a sua chave de API
      </p>

      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="flex py-3 pl-5 mt-2 rounded justify-between
        items-center bg-brand-gray w-full lg:w-1/2"
      >
        <span v-if="state.hasError">Error ao carregar a ApiKey</span>
        <span v-else id="apiKey">{{ store.User.currentUser.apiKey }}</span>
        <div class="flex ml-20 mr-1" v-if="!state.hasError">
          <Icon
            @click="handleCopy"
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <Icon
            id="generate-apiKey"
            @click="handleGenerateApiKey"
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site oara começar a receber feedbacks
      </p>

      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <span v-if="state.hasError">Error ao carregar o script</span>
        <pre v-else>
          &lt;script src="https://fenatan-feedbacker-widget.netlify.app?apy_key={{
            store.User.currentUser.apiKey
          }}"&gt;&lt;/script&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from '@vue/runtime-core';
import { reactive } from '@vue/reactivity';
import { useToast } from 'vue-toastification';
import useStore from '../../hooks/useStore';
import HeaderLogged from '../../components/HeaderLogged';
import ContentLoader from '../../components/ContentLoader';
import Icon from '../../components/Icon';
import pallete from '../../../palette';
import services from '../../services';
import { setApiKey } from '../../store/user';

export default {
  components: { HeaderLogged, ContentLoader, Icon },
  setup() {
    const store = useStore();
    const toast = useToast();
    const state = reactive({
      isLoading: false,
      hasError: null,
    });

    function handleError(error) {
      state.isLoading = false;
      state.hasError = !!error;
    }

    watch(
      () => store.User.currentUser,
      () => {
        if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
          handleError(true);
        }
      }
    );

    async function handleGenerateApiKey() {
      try {
        state.isLoading = true;
        const { data } = await services.users.generateApiKey();

        setApiKey(data.apiKey);
        state.isLoading = false;
      } catch (e) {
        handleError(e);
      }
    }

    async function handleCopy() {
      toast.clear();
      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey);
        toast.success('Copiado');
      } catch (e) {
        handleError(e);
      }
    }

    return {
      state,
      store,
      brandColors: pallete.brand,
      handleGenerateApiKey,
      handleCopy,
    };
  },
};
</script>

<style></style>
