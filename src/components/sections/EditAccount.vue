<template lang="pug">
  main.account
    .container
      .account__card
        .account--top
          h2 Edit account
        .account--line(
          v-for="input in inputs"
        )
          .account--head {{input.placeholder}}
          input-component.account__input(
            v-model="input.value"
            :type="input.type"
            :placeholder="input.placeholder"
          )
      button.account__button.button.button--big.button--black(
        v-on:click="$emit('editAccount')"
      ) Save changes
</template>

<script>
import Input from '../ui/Input';

export default {
  props: {
    firstName: String,
    lastName: String,
    email: String,
  },
  computed: {
    inputs() {
      return [
        { value: this.firstName, placeholder: 'First Name' },
        { value: this.lastName, placeholder: 'Last Name' },
        { value: this.email, placeholder: 'Email' },
      ];
    },
  },
  components: {
    'input-component': Input,
  },
};
</script>

