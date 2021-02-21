export default {
  methods: {
    checkAuthorization(handler) {
      if (localStorage.getItem('email') !== null) {
        handler();
      } else {
        this.$router.push('/');
      }
    },
  },
};
