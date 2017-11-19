<template>
  <section>
      <a name="top" id="top"></a>
      <div class="headercontainter">
        <input class="topinput" type="text" placeholder="输入你想查看的宝贝" @keyup.13="getdata()" v-model.lazy="temp">
        <ul class="headerul" id="headerul" @click="fastGetData($event)">
          <li v-for="(item, index) in nav">
            <img :src="item.src" :alt="item.label" />
            <span>{{item.label}}</span>
          </li>
        </ul>
      </div>
      <ul class="goodslist" >
      <li v-for="(item, index) in commoditymessage" :key="item.seller_id" @click="getyhprice(item)">
          <img :src="item.pict_url" class="image">
          <div style="padding: 14px;">
            <span class="itemtitle">{{item.title}}</span>
            <div class="bottom">
              <span>券后<span class="price">¥{{item.zk_final_price}}</span></span><span>销量{{item.volume}}</span>
            </div>
          </div>
        <span class="yhpaper"> {{item.coupon_info.split(/[\u4e00-\u9fa5]+/g)[2]}}元券</span>
      </li>
    </ul>
    <a class="back" ref="back" href="#top">回到顶部</a>

    <a href="javascript:scroll(0,0)">返回顶部</a>

    <div class="test" ref="test">努力加载中</div>
  </section>
</template>

<script>
  import {getmessage} from '../config/index'
export default {
    data () {
      return {
        currentDate: new Date(),
        commoditymessage: [],
        nav: [
          {src: require('../assets/taoIcon_13.jpg'), label: '女装'},
          {src: require('../assets/taoIcon_15.jpg'), label: '男装'},
          {src: require('../assets/taoIcon_17.jpg'), label: '鞋包'},
          {src: require('../assets/taoIcon_19.jpg'), label: '内衣'},
          {src: require('../assets/taoIcon_21.jpg'), label: '母婴'},
          {src: require('../assets/taoIcon_35.jpg'), label: '化妆品'},
          {src: require('../assets/taoIcon_37.jpg'), label: '居家'},
          {src: require('../assets/taoIcon_39.jpg'), label: '美食'},
          {src: require('../assets/taoIcon_41.jpg'), label: '运动'},
          {src: require('../assets/taoIcon_43.jpg'), label: '数码'}
        ],
        temp: '',
        yhprice: '',
        params: {
          id: '59d77788d760c0a9fb1e7d94',
          category: ['.'],
          page_size: '40',
          page: '1',
          sql: 'testing'
        }
      }
    },
    created () {
      this.getdata1(this.params)
    },
    mounted () {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      back () {
        window.pageYOffset = 0
        document.body.scrollTop = 0
      },
      handleScroll () {
        if (window.pageYOffset + document.body.offsetHeight + 2 >= document.body.scrollHeight) {
          this.params.page ++
          console.log('上拉加载')
          var self = this
          getmessage(this.params).then(function (res) {
            self.commoditymessage = self.commoditymessage.concat(res.data.data)
          })
        }
        if (window.pageYOffset > document.body.offsetHeight) {
          this.$refs.back.style.display = 'block'
        } else {
          this.$refs.back.style.display = 'none'
        }
      },
      getdata () {
        this.params.page = 1
        this.params.category = this.temp.split(' ')
        this.getdata1(this.params)
      },
      getyhprice (item) {
        this.yhprice = item
        this.$store.commit('changeyh', item)
        this.$router.push('/search')
      },
      fastGetData (e) {
        this.params.page = 1
        var dom = e.target.parentNode.innerText
        var pattern = /[\u4e00-\u9fa5]+/g
        this.params.category = dom.match(pattern)
        this.getdata1(this.params)
      },
      getdata1 (val) {
        var self = this
        getmessage(val).then(function (res) {
          self.commoditymessage = res.data.data
        })
      }
    },
    beforeDestroy () {
      this.$root.eventBus.$emit('search1', this.yhprice)
      window.removeEventListener('scroll', this.handleScroll)
    }
}
</script>

<style lang="less" scoped="scoped">
  .headercontainter{
    /*width: 100%;*/
    height: 34rem;
    background-color: white;
    .topinput{
      height: 4rem;
      width: 90%;
      margin: 2rem auto 2rem;
      font-size: 2rem;
      border-radius: 1rem;
    }
    .headerul{
      display: flex;
      flex-wrap:wrap;
      justify-content: space-around;
      /*width: 100%;*/
      font-size: 2rem;
      li{
        width: 19%;
        float: left;
        img{
          width: 7rem;
        }
        span{
          display: block;
        }
      }
    }
  }
  .goodslist{
    margin-left: 1rem;
    margin-right: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    font-size: .8rem;
    li{
      position: relative;
      float: left;
      width: 49%;
      margin-top: 1rem;
      img{
        width: 100%;
        height: 40rem;
      }
      .itemtitle{
        display: block;
        /*width: 100%;*/
        height: 2.5rem;
        font-size: 2rem;
        overflow: hidden;
      }
      .price{
        font-size: 4rem;
        color:red;
        padding-right: 2rem;
      }
      .yhpaper{
        font-size: 2rem;
        background-color:red;
        color: white;
        padding-left: 1rem;
        padding-right: 1rem;
        position: absolute;
        right:0;
        top:0;
        /*opacity: .8;*/
      }
    }
  }
  .test{
    overflow: hidden;
  }
  .back{
    display: none;
    position: fixed;
    bottom:6rem;
    right: 2rem;
    opacity: 1;
    color: red;
  }
</style>
