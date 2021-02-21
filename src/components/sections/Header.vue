<template lang="pug">
  header.header
    .container
      .header__wrapper
        .header__logo
          h2 Blagofest.
          h3 create infinity.
        button.header__button.button.button--white(
          v-on:click="clickButton"
        ) {{loginUser ? `logout` : 'login'}}

</template>

<script>
export default {
  props: {
    loginUser: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickButton() {
      if (this.loginUser) {
        this.$emit('signOutUser');
      } else {
        this.$emit('popupOpen');
      }
    },
  },
};
</script>
