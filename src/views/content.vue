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

      <div class="comment">
        <div class="comment-content" v-for="com in allComments">
          <span class="fll sendName">{{com.username}} :  </span>
          <div class="comment-con">{{com.comment}}</div>
        </div>
        <input type="text" placeholder="评论" class="fll" v-model="comment">
        <el-button type="primary" round @click="submitComment">提交评论</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import timeSwitch from '../util/myTime';
  import cookies from 'js-cookie';

  export default {
    components: {
      Header
    },
    data() {
      return {
        res: {},
        createDate: "",
        str: '',
        username: '',
        comment: '',
        allComments: [],
        com: ''
      }
    },
    methods: {
      getData() {
        let id = this.$route.params.id;
        this.$axios.post(`/getArticle/${id}`).then(res => {
          // console.log(res);
          this.res = res.data.data;
          if (this.res.createdAt) {
            let str = timeSwitch.getTime(this.res.createdAt).time();
            this.createDate = str;
          } else {
            let str = timeSwitch.getTime(this.res.createTime).time();
            this.createDate = str;
          }
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
      },
      submitComment() {
        let params = {
          username: cookies.get('username'),
          comment: this.comment,
          recId: this.$route.params.id,
          sendId: cookies.get('_id')
        };
        if (this.comment.trim()) {    // 相当于去掉空格后，里面有内容为true，没有内容为false
          this.$axios.post('/addComment', params).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              alert(res.data.msg);
            } else {
              alert('评论失败！！')
            }
            this.comment = ''
          })
        } else {
          alert('内容不能为空!')
        }
      },
      getComments() {
        let id = this.$route.params.id;
        this.$axios.post(`/getComment/${id}`).then(res => {
          // console.log(res);
          this.allComments = res.data.data;
        })
      }
    },
    created() {
      this.getData();
    },
    updated(){
      this.getComments()
    }
  }
</script>

<style scoped lang="scss">
  .el-button.is-round {
    padding: 8px 10px;
    border-radius: 10px;
    margin-left: 10px;
  }

  .content-block {
    margin-top: 50px;
    padding-top: 35px;
    background: #fff;
    margin-bottom: 35px;
    border: 1px solid #f1f1f1;
    h2 {
      text-align: center;
      font-size: 2.5em;
      line-height: 1em;
      font-weight: 400;
      color: #303030;
    }
    .content-msg {
      display: flex;
      justify-content: center;
      text-align: center;
      margin-top: 14px;
      color: #959595;
      font-size: 14px;
      .name {
        margin-right: 15px;
        color: #e67e22;
      }
    }
    .content-word {
      margin-top: 30px;
      line-height: 3;
      padding: 10px 30px;
    }
    .comment {
      margin-top: 15px;
      margin-bottom: 30px;
      .comment-content {
        margin-top: 15px;
        margin-left: 30px;
        margin-bottom: 10px;
        .sendName {
          color: #13ce66;
        }
      }
      input {
        width: 500px;
        min-height: 30px;
        border-radius: 8px;
        display: block;
        margin-left: 30px;
        padding-left: 10px;
        outline: none;
        border: 1px solid #aaa;
      }
    }
  }
</style>
