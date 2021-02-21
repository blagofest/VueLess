<template lang="pug">
  main.account
    .container
      .account__card
        h2 {{`${firstName} ${lastName}`}}
        a(:href="`mailto:${email}`") {{ email }}
        p {{ status }}
        img(
          alt="Avatar Blagofest user"
          :src="avatar"
        )
      button.account__button.button.button--big.button--black(
        v-on:click="$emit('editAccount')"
      ) Edit account
</template>

<script>
export default {
  props: {
    firstName: String,
    lastName: String,
    email: String,
    status: String,
    avatar: String,
  },
};
</script>

