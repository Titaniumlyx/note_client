<template>
  <div class="index-container">
    <Header></Header>
    <div class="content">
      <div class="wrap">
        <div class="left-con">
          <Banner></Banner>
          <ArticleList :articles="articleData"></ArticleList>
        </div>
        <div class="user-con">
          <UserBox></UserBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import Banner from '../components/banner';
  import UserBox from '../components/userBox';
  import ArticleList from '../components/articleList';

  export default {
    name: "index",
    components: {
      Header, Banner, UserBox, ArticleList
    },
    data() {
      return {
        articleData: []
      }
    },
    methods: {
      getArticle() {
        this.$axios.get('/getArticle').then(res => {
          // console.log(res);
          this.articleData = res.data.data;
        })
      }
    },
    mounted() {
      this.getArticle();
    }
  }
</script>

<style scoped lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  .index-container {
    background-color: #f1f1f1;
    .content {
      width: 1170px;
      margin: 0 auto;
      .wrap {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .left-con {
          width: 750px;
        }
      }
    }
  }
</style>
