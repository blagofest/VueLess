export default {
  methods: {
    handlerOnEnter(handler, e) {
      const event = e || window.event;
      let isEnter = false;
      if ('key' in event) {
        isEnter = (event.key === 'Enter');
      } else {
        isEnter = (event.keyCode === 13);
      }
      if (isEnter) {
        handler();
      }
    },
  },
};
