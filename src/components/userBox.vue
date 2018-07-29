<template>
<div class="user-container">
  <div class="login-con" >
    <div class="item">
      <input type="text" placeholder="邮箱">
    </div>
    <div class="item">
      <input type="password" placeholder="密码">
    </div>
    <div class="item">
      <el-button type="primary" class="el-btn">登录</el-button>
    </div>
    <div class="item">
      <el-button class="el-btn" @click="$router.push('/register')">注册</el-button>
    </div>
  </div>
  <div class="user-con" v-show="false">
    <div class="user-pic">
      <img src="../assets/imgs/sight.jpg">
    </div>
    <div class="user-item">
      小萌萌:
    </div>
    <div class="user-item">
      email:
    </div>
    <div>
      <el-button type="warning" style="width: 100%; margin-top: 10px">退出登录</el-button>
    </div>
  </div>

</div>
</template>

<script>
    export default {
        name: "userBox"
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
