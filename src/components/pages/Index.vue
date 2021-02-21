<template lang="pug">
  div
    header-component(
      @popupOpen="popupOpen"
    )
    main-component
    popup-component(
      v-if="popup.active"
      :active="popup.active"
      @popupClose="popupClose"
    )
</template>

<script>
import Header from '../sections/Header';
import Main from '../sections/Main';
import Popup from '../blanks/Popup';

import popupParent from '../../mixins/popupParent';

export default {
  mixins: [popupParent],
  components: {
    'header-component': Header,
    'main-component': Main,
    'popup-component': Popup,
  },
};
</script>
