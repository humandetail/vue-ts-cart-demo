<template>
  <strong class="price">
    <span class="price-symbol" :class="symbolClass">￥</span>{{ price }}
  </strong>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'Price'
})
export default class Price extends Vue {
  @Prop({
    default: '0.00'
  })
  private price!: string;

  @Prop({
    default: ''
  })
  private symbolClass!: string;
}

</script>