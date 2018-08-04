<template>
<div class="banner-wrap">
  <el-carousel indicator-position="none" height="340px">
    <el-carousel-item v-for="(item,index) in picArr" :key="index">
      <img :src=item.img>
      <span class="pic-desc clearfix">
        {{item.title}}
      </span>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
  // import pic1 from '../assets/imgs/desert.jpg';
  // import pic2 from '../assets/imgs/sight.jpg';
  // import pic3 from '../assets/imgs/night.jpg';

    export default {
        name: "banner",
      data(){
          return{
            picArr:[
              // {pic:pic1, desc:"沙漠啊，荒芜哎"},
              // {pic:pic2, desc:"风景，不容易"},
              // {pic:pic3, desc:"晚上，真静谧，安静且美丽"}
            ]
          }
      },
      methods: {
          getSwiper(){
            this.$axios.get('/getswiper').then(res => {
              // console.log(res);
              this.picArr = res.data.data;
            })
          }
      },
      mounted(){
          this.getSwiper();
      }
    }
</script>

<style scoped lang="scss">
  .banner-wrap{
    border-radius: 4px;
    overflow: hidden;
  }
  .el-carousel__item{
    img{
      width: 750px;
      height: 340px;
    }
    .pic-desc{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      font-size: 18px;
      font-weight: 400;
      line-height: 40px;
      padding-left: 20px;
      color: rgba(255,255,255,.8);
      background: rgba(0,0,0,.5);
    }
  }
</style>
