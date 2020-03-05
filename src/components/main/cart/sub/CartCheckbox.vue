<template>
  <div class="cart-checkbox" :class="{ checked: is_checked }">
    <input
      :id="checkboxId"
      type="checkbox"
      class="checkbox-item"
      @change="handleChecked"
    />
    <label :for="checkboxId">{{ labelText }}</label>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CartCheckbox extends Vue {

  @Prop({
    default: false
  })
  private is_checked!: boolean; // 是否选中

  @Prop({
    required: true
  })
  private field!: string; // 全选: select-all | 选中店铺 select-shop | 选中某个商品 select-item

  @Prop({
    default: ''
  })
  private id!: string; // 全选: '' | 店铺 | 商品

  get checkboxId (): string {
    return 'J_checkbox_' + (Math.random() * 100000000).toFixed(0)
  }

  get labelText (): string {
    let text = '';
    switch (this.field) {
      case 'all':
        text = '选中所有商品';
        break;
      case 'shop':
        text = '选中店铺所有商品';
        break;
      case 'goods':
        text = '选中该商品';
        break;
      default: 
        break;
    }
    return text;
  }

  // 选中
  handleChecked (): void {
    this.$bus.$emit('changeCheckd', {
      field: this.field,
      id: this.id
    });
  }
}
</script>