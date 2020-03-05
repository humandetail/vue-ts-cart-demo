<template>
  <section class="address-wrapper container">
    <section-title title="管理收货地址" />

    <ul class="address-bd flex-container" :class="{ needAfter }">
      <li
        is="AddressCard"
        v-for="address of addressList"
        :key="address.id"
        :addressItem="address"
        @delete="handleDelete"
        @setDefault="handleSetDefault"
      ></li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

import { AddressItem } from '@/types/index';

import SectionTitle from '../sub/SectionTitle.vue';
import AddressCard from './sub/AddressCard.vue';

@Component({
  name: 'AddressWrapper',
  components: {
    SectionTitle,
    AddressCard
  }
})
export default class AddressWrapper extends Vue {
  private addressList: AddressItem[] = [];

  get needAfter (): boolean {
    return this.addressList.length % 3 === 2;
  }

  // 获取地址信息
  getAddressInfo (): void {
    axios.get('/mock/address.json')
      .then((response) => {
        let res = response.data;
        if (res.err_code === 0) {
          const data = res.data as AddressItem[];
          
          this.addressList = [...data];
        } else {
          throw new Error('Request failed');
        }
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }

  // 删除地址
  handleDelete (id: string):void {
    const idx: number = this.addressList.findIndex((addr: AddressItem) => addr.id === id);

    if (idx === -1) {
      console.error('程序出错');
    }

    this.addressList.splice(idx, 1);
  }

  // 设置为默认地址
  handleSetDefault (id: string):void {
    const addressList = this.addressList;

    addressList.forEach((addr: AddressItem) => {
      if (addr.id === id) {
        addr.is_default = true;
      } else {
        addr.is_default = false;
      }
    });
  }

  mounted (): void {
    this.getAddressInfo();
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/address.scss';
</style>