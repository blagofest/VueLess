<template lang="pug">
    label.input(
        :class="{'error': error, 'pressed': pressed}"
    )
        input.input__value(
            ref="input"
            :name="placeholder"
            :type="type"
            :value="value"
            :placeholder="placeholder"
            v-on:focus="focus"
            v-on:blur="blur"
            v-on:input="onInput"
        )
        .input__error-text(
            :class="{'hide': !error}"
            :style="{'height': errorTextHeight}"
        )
            p(
                ref="errorText"
            ) {{ errorText }}
</template>

<script>

export default {
  props: {
    placeholder: {
      required: true,
      type: [String, Number],
    },
    value: {
      required: true,
    },
    error: {
      type: Boolean,
      required: false,
    },
    errorText: {
      type: String,
      required: false,
    },
    type: {
      type: String,
    },
  },
  data: () => ({
    errorTextHeight: null,
    pressed: false,
  }),
  mounted() {
    setTimeout(() => {
      this.errorTextHeight = `${this.$refs.errorText.getBoundingClientRect().height}px`;
    });
  },
  methods: {
    focus() {
      this.pressed = true;
      this.$emit('focus');
    },
    blur() {
      this.pressed = false;
      this.$emit('blur');
    },
    onInput(e) {
      const target = e.target || e.srcElement;
      let { value } = target;
      let reg = null;

      switch (this.type) {
        case 'number': {
          reg = /[^0-9]/g;
          break;
        }
        case 'phone': {
          reg = /[^0-9()+.,-]/g;
          break;
        }
        default: {
          break;
        }
      }

      if (reg) {
        target.value = value.replace(reg, '');
        value = target.value;
      }

      if (target.value.length > 50) {
        target.value = target.value.slice(0, 50);
        value = value.slice(0, 50);
      }

      this.$emit('input', value);
    },
  },
  watch: {
    value() {
      this.$emit('update:error', false);
    },
  },
};
</script>
