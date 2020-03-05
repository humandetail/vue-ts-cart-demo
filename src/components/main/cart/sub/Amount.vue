<template>
  <div class="amount-wrapper">
    <div class="item-amount">
      <a
        href="javascript:;"
        class="J_minus minus"
        :class="minusClass"
        @click="handleClick('minus')"
      >-</a>
      <input 
        type="text"
        class="amount-text"
        autocomplete="off"
        v-model="goods_number"
        @input="handleInput"
      />
      <a
        href="javascript:;"
        class="J_plus plus"
        :class="plusClass"
        @click="handleClick('plus')"
      >+</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'Amount'
})
export default class Amount extends Vue {
  @Prop({
    type: String,
    required: true
  })
  private goods_id!: string;

  @Prop({
    required: true,
    default: 1
  })
  private count!: number;  // 商品的数量

  @Prop({
    required: true,
    default: 1
  })
  private stock!: number; // 商品的库存量

  private goods_number: number = this.count;

  get minusClass (): string {
    return this.goods_number <= 1 ? 'no-minus' : '';
  }
  
  get plusClass (): string {
    return this.goods_number >= this.stock ? 'no-plus' : '';
  }

  // 用户输入商品数量
  handleInput (ev: Event): void {
    let e: Event = ev || window.event,
          tar = (e.target || e.srcElement) as HTMLInputElement,
          value = Number(tar.value);
    
    // 商品数量限制
    if (isNaN(value) || value <= 0) {
      this.goods_number = 1;
    } else if (value > this.stock) {
      this.goods_number = this.stock;
    } else {
      this.goods_number = value;
    }
    this.fire();
  }

  // 用户点击增加或减少按钮
  handleClick (field: string) {
    switch (field) {
      case 'plus': // 增加
        if (this.goods_number >= this.stock) {
          return;
        }
        this.goods_number ++;
        break;
      case 'minus': // 减少
        if (this.goods_number <= 1) {
          return;
        }
        this.goods_number --;
        break;
      default:
        break;
    }

    this.fire();
  }

  // 触发事件
  fire (): void {
    this.$bus.$emit('changeGoodsCount', {
      count: this.goods_number,
      goods_id: this.goods_id
    });
  }
}
</script>