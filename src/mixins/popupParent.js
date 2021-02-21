export default {
  data() {
    return {
      popup: {
        active: false,
      },
    };
  },
  methods: {
    popupOpen() {
      this.popup.active = true;
    },
    popupClose() {
      this.popup.active = false;
    },
  },
};
