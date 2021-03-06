<template>
  <div id="modal-create-account" class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">
      Crie na sua conta
    </h1>

    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">Nome</span>
        <input
          v-model="state.name.value"
          type="text"
          placeholder="João Silva"
          :class="{ 'border-brand-danger': !!state.name.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg
          bg-gray-100 border-2 border-transparent rounded"
        />
        <span v-if="!!state.name.errorMessage" class="block font-medium text-brand-danger">
          {{ state.name.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          v-model="state.email.value"
          type="email"
          placeholder="j-fake@gmail.com.br"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg
          bg-gray-100 border-2 border-transparent rounded"
        />
        <span v-if="!!state.email.errorMessage" class="block font-medium text-brand-danger">
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          :class="{ 'border-brand-danger': !!state.password.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg
          bg-gray-100 border-2 border-transparent rounded"
        />
        <span v-if="!!state.password.errorMessage" class="block font-medium text-brand-danger">
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{ 'opacity-50': state.isLoading }"
        class="px-8 py-3 mt-10 text-2xl text-white rounded-full bg-brand-main
        focus:outline-none transistion-all duration-150"
      >
        <Icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Cadastrar</span>
      </button>
    </form>
  </div>
</template>

<script>
/* eslint-disable comma-dangle */

import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useField } from 'vee-validate';
import { useToast } from 'vue-toastification';
import useModal from '../../hooks/useModal';
import Icon from '../Icon';
import { validateEmptyAndLength3, validateEmptyAndEmail } from '../../utils/validators';
import services from '../../services';

export default {
  components: { Icon },
  setup() {
    const modal = useModal();
    const router = useRouter();
    const toast = useToast();

    const { value: nameValue, errorMessage: nameErrorMessage } = useField(
      'name',
      validateEmptyAndLength3
    );

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      'email',
      validateEmptyAndEmail
    );

    const { value: passwordValue, errorMessage: passwordErrorMessage } = useField(
      'password',
      validateEmptyAndLength3
    );

    const state = reactive({
      hasErros: false,
      isLoading: false,
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage,
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    });

    async function login({ email, password }) {
      const { data, errors } = await services.auth.login({
        email,
        password,
      });

      if (!errors) {
        window.localStorage.setItem('token', data.token);
        router.push('feedbacks');
        modal.close();
      }

      state.isLoading = false;
    }

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;

        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value,
        });

        if (!errors) {
          await login({ email: state.email.value, password: state.password.value });
          return;
        }

        switch (errors?.status) {
          case 401:
            toast.error('Dados inválidos');
            break;
          default:
            toast.error('Ocorreu um erro ao criar conta');
        }
      } catch (e) {
        state.hasErros = !!e;
        toast.error('Ocorreu um erro ao criar conta');
      } finally {
        state.isLoading = false;
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    };
  },
};
</script>
