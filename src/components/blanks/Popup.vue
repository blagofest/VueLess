<template lang="pug">
    .popup(
        data-scroll-lock-fill-gap
        ref="popup"
        :class="[{'active': showPopup, loading}]"
    )
      .popup__wrapper
        .popup__close(
          v-on:click="popupClose"
        )
        .popup__content
          input-component.popup__line(
            v-for="(input, index) in inputs"
            v-model="input.value"
            :placeholder="input.placeholder"
            :type="input.type"
            :error.sync="input.error"
            :errorText="errorText"
            :key="index"
            @focus="onFocus"
            @blur="onBlur"
          )
          button.popup__line.button.button--big.button--black(
            v-on:click="loginUser"
          ) Login
      .popup__preloader(
        v-if="loading"
      )
        preloader-component
</template>

<script>
import fetch from 'isomorphic-fetch';

import Input from '../ui/Input';
import Preloader from '../ui/Preloader';

import popup from '../../mixins/popup';
import handlerOnEnter from '../../mixins/handlerOnEnter';

export default {
  mixins: [
    popup, handlerOnEnter,
  ],
  data: () => ({
    style: {
      container: {
        height: null,
      },
      height: null,
    },
    errorText: 'Required to fill',
    loading: false,
    inputs: [
      {
        placeholder: 'Email',
        value: '',
        error: false,
      },
      {
        placeholder: 'Password',
        value: '',
        error: false,
        type: 'password',
      },
    ],
  }),
  methods: {
    onFocus() {
      document.addEventListener('keydown', this.onKeyDown, { passive: true });
    },

    onKeyDown(e) {
      this.handlerOnEnter(this.loginUser, e);
    },

    onBlur() {
      document.removeEventListener('keydown', this.onKeyDown);
    },

    validation() {
      this.errorText = 'Required to fill';
      this.inputs[0].error = !this.inputs[0].value;
      this.inputs[1].error = !this.inputs[1].value;

      return !this.inputs[0].error && !this.inputs[1].error;
    },

    loginUser() {
      if (this.validation()) {
        this.loading = true;

        const url = 'https://reqres.in/api/login';

        const data = {
          email: this.inputs[0].value,
          password: this.inputs[1].value,
        };

        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(r => r.json())
          .then((response) => {
            setTimeout(() => {
              this.loading = false;

              if (response.error === 'user not found') {
                this.errorText = 'This user not found';
                this.inputs[0].error = true;
              }

              if (response.token) {
                localStorage.setItem('email', this.inputs[0].value);
                this.$router.push('/profile');
              }

              document.activeElement.blur();
            }, 1000);
          });
      }
    },
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown);
  },
  watch: {
    send() {
      this.style.height = `${this.$refs.response.getBoundingClientRect().height}px`;
    },
  },
  components: {
    'input-component': Input,
    'preloader-component': Preloader,
  },
};
</script>
