<template lang="pug">
  div
    header-component(
      :loginUser="loginUser"
      @signOutUser="signOutUser"
    )
    component(
      :is="`${user.edit ? 'edit-' : ''}account-component`"
      :firstName="user.firstName"
      :lastName="user.lastName"
      :email="user.email"
      :status="user.status"
      :avatar="user.avatar"
      @editAccount="editAccount"
    )
</template>

<script>
import fetch from 'isomorphic-fetch';

import Header from '../sections/Header';
import Account from '../sections/Account';
import checkAuthorization from '../../mixins/checkAuthorization';
import EditAccount from '../sections/EditAccount';

export default {
  mixins: [checkAuthorization],
  data() {
    return {
      user: {
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        avatar: null,
        status: null,
        edit: false,
      },
    };
  },
  beforeMount() {
    this.checkAuthorization(() => {
      this.user.id = 4;
      this.getUserData();
    });
  },
  computed: {
    loginUser() {
      return !!this.user.email;
    },
  },
  methods: {
    getUserData() {
      const url = `https://reqres.in/api/users/${this.user.id}`;

      fetch(url, {
        method: 'GET',
      })
        .then(r => r.json())
        .then((response) => {
          this.user.firstName = response.data.first_name;
          this.user.lastName = response.data.last_name;
          this.user.email = response.data.email;
          this.user.avatar = response.data.avatar;
          this.user.status = response.support.text;
        });
    },
    signOutUser() {
      localStorage.removeItem('email');
      this.$router.push('/');
    },
    editAccount() {
      this.user.edit = !this.user.edit;
    },
  },
  components: {
    'header-component': Header,
    'account-component': Account,
    'edit-account-component': EditAccount,
  },
};
</script>

