<template>
<div class="user-container">
  <div class="login-con" v-if="!userMsg.username">
    <div class="item">
      <input type="text" placeholder="邮箱" v-model="email">
    </div>
    <div class="item">
      <input type="password" placeholder="密码" v-model="password" @keyup.enter="handleLogin">
    </div>
    <div class="item">
      <el-button type="primary" class="el-btn" @click="handleLogin">登录</el-button>
    </div>
    <div class="item">
      <el-button class="el-btn" @click="$router.push('/register')">注册</el-button>
    </div>
  </div>
  <div class="user-con" v-else>
    <div class="user-pic">
      <img src="../assets/imgs/sight.jpg">
    </div>
    <div class="user-item">
      小萌萌: {{userMsg.username}}
    </div>
    <div class="user-item">
      email: {{userMsg.email}}
    </div>
    <div>
      <el-button type="warning" style="width: 100%; margin-top: 10px">退出登录</el-button>
    </div>
  </div>

</div>
</template>

<script>
  import cookies from 'js-cookie';

    export default {
        name: "userBox",
      data(){
          return{
            username:"",
            email:"",
            password:"",
            userMsg: {
              username:"",
              email:""
            }
          }
      },
      methods: {
        handleLogin(){
          let params = {
            email: this.email,
            password: this.password,
            username: this.username
          };
            this.$axios.post('/entry', params).then(res => {
              if(res.data.code == 200){
                this.userMsg = res.data.data;
                cookies.set('username',this.userMsg.username,{ expires: 14 });
                cookies.set('email',this.userMsg.email,{ expires: 14 });
                alert('登录成功，欢迎回来' + res.data.data.username)
              }
            })
        },
        getUserMsg(){
          let username = cookies.get('username');
          let email = cookies.get('email');

          if(username && email){
            this.userMsg.username = username;
            this.userMsg.email = email;
          }
        }
      },
      mounted() {
          this.getUserMsg();
      }
    }
</script>

<style scoped lang="scss">
  .user-container{
    box-sizing: border-box;
    width: 360px;
    background: #fff;
    border-radius: 4px;
    padding: 21px 30px;
    .login-con{
      .item{
        margin-top: 30px;
        input{
          box-sizing: border-box;
          width: 100%;
          border: 1px solid #f1f1f1;
          border-radius: 4px;
          padding: 14px;
          outline: none;
        }
        .el-btn{
          width: 100%;
        }
      }
    }
    .user-con{
      padding-top: 30px;
      .user-pic{
        img{
          display: block;
          margin: 0 auto;
          width: 100px;
          height: 100px;
        }
      }
      .user-item{
        font-size: 16px;
        font-weight: 400;
        color: #333;
        line-height: 36px;
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
