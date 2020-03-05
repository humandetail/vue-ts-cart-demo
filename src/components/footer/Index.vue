<template>
  <footer class="footer">
    <div class="container">
      <div class="copyright">
        © 2014 - 2020
        <a href="/">细节个人博客</a>&nbsp;
        <a href="http://beian.miit.gov.cn/" target="_blank">粤ICP备14074910号</a>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'CommonFooter'
})
export default class CommonFooter extends Vue {}

</script>

<style lang="scss">
@import '@/assets/styles/footer.scss';
</style>