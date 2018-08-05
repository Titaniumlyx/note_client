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
      <img :src="userMsg.avatar">
    </div>
    <div class="user-item">
      小萌萌: {{userMsg.username}}
    </div>
    <div class="user-item">
      email: {{userMsg.email}}
    </div>
    <div class="modify">
      <el-button type="warning" style="width: 100%;margin-top: 10px" @click="$router.push('/modiInfor')">修改信息</el-button>
    </div>
    <div>
      <el-button type="warning" style="width: 100%; margin-top: 10px" @click="handleOut">退出登录</el-button>
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
              email:"",
              avatar: ""
            }
          }
      },
      methods: {
        handleLogin(){
          let params = {
            email: this.email,
            password: this.password,
            // username: this.username,
            avatar: this.avatar
          };
            this.$axios.post('/entry', params).then(res => {
              // console.log(res);
              if(res.data.code == 200){
                this.userMsg = res.data.data;
                cookies.set('username',this.userMsg.username,{ expires: 14 });
                cookies.set('email',this.userMsg.email,{ expires: 14 });
                cookies.set('avatar',this.userMsg.avatar,{ expires: 14 });
                alert('登录成功，欢迎回来' + res.data.data.username)
              }else{
                alert(res.data.msg)
              }
            })
        },
        getUserMsg(){
          let username = cookies.get('username');
          let email = cookies.get('email');
          let avatar = cookies.get('avatar');  //从cookies中得到所需信息

          if(username && email){
            this.userMsg.username = username;
            this.userMsg.email = email;
            this.userMsg.avatar = avatar;   //把所需的信息进行传输，方便渲染
          }
        },
        handleOut(){
          this.userMsg.username = '';
          this.userMsg.email = '';
          this.userMsg.avatar = '';
          cookies.remove('username');
          cookies.remove('email');
          cookies.remove('avatar');

          this.$axios.delete('/logout').then(res => {
            if(res.data.data == 200){
              alert('退出登录成功')
            }else{
              alert(res.data.msg);
            }
          })
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
