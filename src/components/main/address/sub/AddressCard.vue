<template>
  <li class="address-card" :class="{default: addressItem.is_default}">
    <div class="address-inner">
      <div class="consignee row" title="收货人">{{ addressItem.name }}</div>
      <div class="address row" title="详细地址">{{ addressItem.address }}</div>
      <div class="phone row" title="联系电话">{{ addressItem.phone }}</div>
      <!-- <div class="postcode row" title="邮编">{{ addressItem.postcode }}</div> -->
    </div>
    <div class="address-operations clearfix">
      <span class="default is_default" v-if="addressItem.is_default">默认地址</span>
      <a
        href="javascript:;"
        class="default set-default-btn"
        v-if="!addressItem.is_default"
        @click="handelSetDefault"
      >设为默认</a>
      <a href="javascript:;" class="btn delete-btn" @click="handleDelete">删除</a>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { AddressItem } from "@/types/index";

@Component({
  name: "AddressCard"
})
export default class AddressCard extends Vue {
  @Prop({
    required: true
  })
  private addressItem!: AddressItem;

  handelSetDefault(): void {
    this.$emit("setDefault", this.addressItem.id);
  }

  handleDelete(): void {
    if (confirm("确认要删除这个地址吗？")) {
      this.$emit("delete", this.addressItem.id);
    }
  }
}
</script>