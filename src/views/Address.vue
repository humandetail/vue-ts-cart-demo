<template>
  <div class="address-page">
    <common-header />

    <address-wrapper />

    <common-footer />
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

import CommonHeader from '@/components/header/Index.vue';
import AddressWrapper from '@/components/main/address/Index.vue';
import CommonFooter from '@/components/footer/Index.vue';

@Component({
  name: 'Address',
  components: {
    CommonHeader,
    AddressWrapper,
    CommonFooter
  }
})
export default class Address extends Vue {}
</script>