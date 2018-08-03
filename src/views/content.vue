<template>
<div class="content-con">
  <Header></Header>
  <div class="content-block">
    <h2>{{res.title}}</h2>
    <div class="content-msg">
      <div class="author">
        作者：<span class="name">{{res.author}}</span>
      </div>
      <!--<div class="create-time">{{res.createdAt}}</div>-->
      <div class="create-time">{{createDate}}</div>
    </div>
    <div class="content-word" v-html="res.content"></div>
  </div>
</div>
</template>

<script>
  import Header from '../components/Header';
  import timeSwitch from '../util/myTime';

    export default {
      components: {
        Header
      },
      data(){
          return{
            res: { },
            createDate: "",
            str: ''
          }
      },
      methods: {
          getData(){
            let id = this.$route.params.id;
            this.$axios.post(`/getArticle/${id}`).then(res => {
              console.log(res);
              this.res = res.data.data;
              if(this.res.createdAt){
                let str = timeSwitch.getTime(this.res.createdAt).time();
                this.createDate = str;
              }else{
                let str = timeSwitch.getTime(this.res.createTime).time();
                this.createDate = str;
              }
              // console.log(str);
              // this.createDate = str;

              // let date = new Date(this.res.createdAt);
              // let y = date.getFullYear();
              // let m = date.getMonth() + 1;
              // let d = date.getDate();
              // let h = date.getHours();
              // let min = date.getMinutes();
              // let s = date.getSeconds();
              // let createDate = y+'年'+m+'月'+d+'日'+ '   ' + h + ':' + min + ':' + s;
              // console.log(createDate);
              // this.createDate = createDate;
            })
          }
      },
      created(){
          this.getData();
      }
    }
</script>

<style scoped lang="scss">
  .content-block{
    margin-top: 50px;
    padding-top: 35px;
    background: #fff;
    margin-bottom: 35px;
    border: 1px solid #f1f1f1;
    h2{
      text-align: center;
      font-size: 2.5em;
      line-height: 1em;
      font-weight: 400;
      color: #303030;
    }
    .content-msg{
      display: flex;
      justify-content: center;
      text-align: center;
      margin-top: 14px;
      color: #959595;
      font-size: 14px;
      .name{
        margin-right: 15px;
        color: #e67e22;
      }
    }
    .content-word{
      margin-top: 30px;
      line-height: 3;
      padding: 10px 30px;
    }
  }
</style>
