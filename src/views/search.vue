<template>
  <div class="search-container">
    <Header></Header>
    <div class="search-wrap">
      <div class="inputBlock clearfix">
        <input class="fll" type="text" v-model="title" @keyup.enter="handleSearch">
        <span class="fll" @click="handleSearch">搜索</span>
      </div>
      <h3>相关笔记</h3>
      <div class="lists">
        <ArticleList :articles="articleData"></ArticleList>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import ArticleList from '../components/articleList';

  export default {
    name: "search",
    components: {
      Header, ArticleList
    },
    data() {
      return {
        articleData: [],
        title: ""
      }
    },
    methods: {
      getArticle() {
        this.$axios.get('/getArticle').then(res => {
          // console.log(res);
          this.articleData = res.data.data;
        })
      },
      handleSearch() {
        let title = this.title;
        this.$axios.get('/articleSearch', {params: {title}}).then(res => {
            // console.log(res);
            if(res.data.code == 200){
              this.articleData = res.data.data;
            }
          }
        )
      }
    },
    mounted(){
      this.getArticle();
    }
  }
</script>

<style scoped lang="scss">
  .search-wrap {
    width: 1170px;
    margin: 50px auto;
    .inputBlock {
      margin-bottom: 18px;
      input {
        outline: none;
        width: 300px;
        height: 40px;
        border-radius: 4px;
      }
      span {
        display: block;
        width: 80px;
        height: 43px;
        border-radius: 4px;
        line-height: 43px;
        text-align: center;
        background: #F43708;
        color: #fff;
        font-size: 18px;
        margin-left: 3px;
        cursor: pointer;
      }
    }
  }
</style>
