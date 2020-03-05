<template>
  <div class="goods-max-tips" v-if="show">
    <span class="txt">最多只能购买</span>
    <em class="num">{{ limit }}</em>
    <span class="txt">件</span>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'GoodsMaxTips'
})
export default class GoodsMaxTips extends Vue {
  @Prop({
    required: true
  })
  private limit!: number;

  @Prop({
    required: true
  })
  private count!: number;

  get show ():boolean {
    return this.count >= this.limit;
  }
}
</script>