<template>
  <section>
    <div class="header">
      <div class="center" @click="getcoupons()">
        <div class="celeft">¥<span>{{couponinfo}}</span> <p>券有效期</p>
        <p>{{data.coupon_end_time}} 剩 {{data.coupon_remain_count}}</p></div>
        <div class="ceright">立即领券</div>
      </div>
      <div class="goodsinfo">
        <img :src=data.pict_url alt="">
        <div class="goodsright">
          <p class="title">{{data.title}}</p>
          <span class="baoyou">券后包邮</span> <span class="volume">销量{{data.volume}}</span>
          <p class="xianjia">现价：¥{{data.zk_final_price}}</p>
          <p class="quanhou">用券后 <span class="rembi">¥<span class="finalprice">{{finalparice}}</span></span></p>
        </div>
      </div>
    </div>
    <div class="coupons">
    <p>
      1. 点击“复制口令”按钮，拷贝口令 &gt;打开手机APP &gt; 粘贴口令 &gt; 成功领取优惠券后，购买商品时使用，即可享受优惠。
      <br><br>
      2. 在手机APP-我的某宝-卡券包-网店优惠券，可查询已发放到账户的优惠券。
      <br><br>
      3. 因商品参与其它活动等原因，付款时优惠券可能无法使用，此时商品最终成交价以您实际付款时提示金额为准。
      <br><br>
      4. 获取、使用优惠券时如存在违规行为（作弊领取、恶意套现、刷取信誉、虚假交易等），某宝将取消用户领取资格、撤销违规交易且收回全部优惠券（含已使用及未使用的），必要时追究法律责任。
    </p>
    </div>
    <yd-popup v-model="show1" position="center" width="90%">
      <p class="ticket">
        <span>淘口令</span>
        {{ticket}}
      </p>
      <p>复制口令在手机App中使用</p>
      <p style="text-align: center;">
        <yd-button @click.native="show1 = false">Close Center Popup</yd-button>
      </p>
    </yd-popup>
  </section>
</template>
<style src="./search.less" lang="less" scoped="scoped"></style>
<script>
  import {gettaokouli} from '../config'
  export default{
    data () {
      return {
        show1: false,
        data: '',
        ticket: '',
        couponinfo: '',
        finalparice: ''
      }
    },
    created () {
      this.getdata()
    },
    methods: {
      getdata () {
        this.data = this.$store.state.yhprice
        this.couponinfo = this.data.coupon_info.split(/[\u4e00-\u9fa5]+/g)[2]
        this.finalparice = Math.floor(this.data.zk_final_price - this.data.coupon_info.split(/[\u4e00-\u9fa5]+/g)[2])
      },
      getcoupons () {
        this.show1 = true
        var self = this
        gettaokouli({url: this.data.coupon_click_url}).then(function (res) {
          self.ticket = res.data.data.model
        })
      }
    }
  }
</script>
