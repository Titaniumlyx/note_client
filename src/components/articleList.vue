<template>
    <div class="art-container">
      <router-link :to="{name: 'content',params: {id: item._id}}" class="item" v-for="item in allArticle" :key="item._id">
        <!--name: 'content'，这时路由里就必须有name这个属性-->
        <div class="item-top">
          <div class="img-wrap">
            <img :src="item.userPic">
          </div>
          <div class="item-msg">
            <div class="row-one">
              <span class="name">{{item.author}}</span>
              <h2>{{item.title}}</h2>
            </div>
            <div class="row-two">
              <span class="row-item">浏览: {{item.browse}}</span>
              <span class="row-item">回复: {{item.commentsId.length}}</span>
              <span class="row-item">分类: </span>
              <span class="row-item el" v-for="el in item.classify">{{el}} </span>
            </div>
          </div>
        </div>
        <div class="item-content clearfix">
          <span class="clearfix">{{item.contentText}}</span>
        </div>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "articleList",
      props: {
          articles: Array
      },  // 父子组件传值，首页可用其绑定传值
      data(){
          return{
            allArticle: []  //这时子组件里需要渲染的数组 ，通过 watch 监听来绑定并改变
          }
      },
      watch: {
        articles(val){
          let basePath = process.env.NODE_ENV == 'development'? '/api':''

          this.allArticle = val.map(item => {
            console.log(item);
            return item;
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  .art-container{
    box-sizing: border-box;
    margin-top: 30px;
    border-radius: 4px;
    padding: 2px 20px;
    background: #fff;
    .item{
      text-decoration: none;
      color: #333;
      display: block;
      padding-bottom: 20px;
      margin-top: 20px;
      .item-top{
        display: flex;
        .img-wrap{
          margin-right: 15px;
          width: 95px;
          height: 80px;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .item-msg{
          width: 100%;
          .row-one{
            display: flex;
            .name{
              color: #409eff;
              font-weight: 700;
              padding-right: 8px;
              border-right: 1px solid #333;
            }
            h2{
              font-size: 18px;
              font-weight: 700;
              margin-left: 15px;
            }
          }
          .row-two{
            box-sizing: border-box;
            padding: 4px 8px;
            background: #bbb;
            margin-top: 15px;
            border-radius: 4px;
            width: 100%;
            .row-item{
              font-size: 14px;
              color: #333;
              font-weight: 700;
              margin-right: 30px;
            }
            .el{
              margin-left: -23px;
            }
          }
        }
      }
      .item-content{
        span{
          width: 700px;
          display: block;
        }
      }
    }
  }
</style>
