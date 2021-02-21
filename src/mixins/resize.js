export default {
  data: () => ({
    resize: {
      prevWidth: null,
      currentWidth: null,
      callback: null,
    },
  }),
  methods: {
    addResizeWidthEvent(callback) {
      this.getResizeWidth();
      this.resize.callback = callback;
      window.addEventListener('resize', this.onWindowWidthResize, { passive: true });
    },
    removeResizeWidthEvent() {
      window.removeEventListener('resize', this.onWindowWidthResize);
    },
    onWindowWidthResize() {
      this.resize.prevWidth = this.resize.currentWidth;
      this.resize.currentWidth = window.innerWidth;

      if (this.resize.prevWidth !== this.resize.currentWidth) {
        this.resize.callback();
      }
    },
    getResizeWidth() {
      this.resize.currentWidth = window.innerWidth;
      this.resize.prevWidth = window.innerWidth;
    },
  },
};
