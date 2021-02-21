import scrollLock from 'scroll-lock';
import handlerOnEsc from './handlerOnEsc';
import resize from './resize';

export default {
  mixins: [
    handlerOnEsc,
    resize,
  ],
  data: () => ({
    showPopup: false,
  }),
  props: {
    active: {
      type: Boolean,
      required: true,
    },
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyDown);
    this.addResizeWidthEvent(this.onResize);
    scrollLock.disablePageScroll(this.$refs.popup);
    setTimeout(() => {
      this.showPopup = true;
    });
  },
  destroyed() {
    this.showPopup = false;
    document.removeEventListener('keydown', this.onKeyDown);
    this.removeResizeWidthEvent();
    scrollLock.enablePageScroll();
  },
  methods: {
    popupClose() {
      this.$emit('popupClose');
    },

    onKeyDown(e) {
      this.handlerOnEsc(this.close, e);
    },

    onResize() {
      if (this.active) {
        this.popupClose();
      }
    },
  },
};
