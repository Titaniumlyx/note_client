<template>
    <div class="register-container">
      <Header></Header>
      <div class="register-con">
        <h2>新用户注册</h2>
        <div class="item">
          <input type="text" placeholder="用户名" v-model="username">
        </div>
        <div class="item">
          <input type="text" placeholder="邮箱" v-model="email">
        </div>
        <div class="item">
          <input type="password" placeholder="密码" v-model="password" @keyup.enter="handleRegister">
        </div>
        <div class="item">
          <el-button type="primary" class="el-btn" @click="handleRegister">注册</el-button>
        </div>
      </div>
    </div>
</template>

<script>
  import Header from '../components/Header';

    export default {
        name: "register",
      components: {
        Header
      },
      data(){
          return{
            username:"",
            email:"",
            password:""
          }
      },
      methods: {
        handleRegister(){
          let params = {   // 取到数据
            username: this.username,
            password: this.password,
            email: this.email
          }
          // 用axios
          this.$axios.post('/user',params).then(res => {
            if(res.data.code == 200){
              alert('注册成功');
              this.$router.push('/')
            }else{
              alert(res.data.msg)
            }
          })
        }
      }
    }
</script>

<style scoped lang="scss">
.register-container{
  background: #f1f1f1;
  .register-con{
    background: #fff;
    width: 710px;
    border-radius: 4px;
    margin: 100px auto 0;
    padding: 30px 0 50px;
    h2{
      font-weight: 400;
      color: #333;
      text-align: center;
      display: block;
    }
    .item{
      box-sizing: border-box;
      width: 390px;
      margin-top: 30px;
      margin-left: 160px;
      input{
        box-sizing: border-box;
        width: 100%;
        outline: none;
        border: 1px solid #f1f1f1;
        border-radius: 4px;
        padding: 14px;
      }
      .el-btn{
        width: 100%;
      }
    }
  }
}
</style>
