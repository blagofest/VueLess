<template lang="pug">
  MAIN.main(
    :style="{height: windowHeight}"
  )
    .main__container.container
      .main__wrapper
        .main__text
          h1 Branding made&nbsp;simple!
          p We can do wonderful things:
          ul
            li(
              v-for="(item, index) in benefits"
              :class="{'active': activeMainPhoto === index}"
              v-on:click="changeActiveMainPhoto(index)"
            )
              span {{ item }}
        .main__slider
          img(
            v-for="(sliderImage, index) in sliderImages"
            :class="{'active': index === activeMainPhoto}"
            alt="Illustration benefits Blagofest project"
            :src="require(`../../assets/img/slider/${sliderImage}`)"
          )
</template>

<script>
export default {
  data: () => ({
    activeMainPhoto: null,
    sliderImages: [
      '0.png',
      '1.png',
      '2.png',
    ],
    benefits: [
      'Presentations',
      'Logos',
      'Web sites',
    ],
  }),
  computed: {
    windowHeight() {
      return `${window.innerHeight}px`;
    },
  },
  mounted() {
    this.startSlider();
  },
  methods: {
    startSlider() {
      this.activeMainPhoto = 0;
      this.nextSlide();
    },
    nextSlide() {
      this.timeoutSlider = setInterval(() => {
        if (this.activeMainPhoto === 2) {
          this.activeMainPhoto = 0;
        } else {
          this.activeMainPhoto += 1;
        }
      }, 5000);
    },
    stopSlider() {
      clearInterval(this.timeoutSlider);
    },
    changeActiveMainPhoto(index) {
      if (index !== this.activeMainPhoto) {
        this.stopSlider();
        this.activeMainPhoto = index;
        this.nextSlide();
      }
    },
  },
};
</script>
