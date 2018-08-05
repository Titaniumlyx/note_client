<template>
  <div class="modi-container">
    <Header></Header>
    <div class="register-con">
      <h2>修改个人信息</h2>
      <span class="fll">修改头像</span>
      <!--form表单提交-->
      <!--<form action="/api/uploadPic"-->
      <!--method="post" enctype="multipart/form-data">-->
      <!--<input type="file" name="avatar">-->
      <!--<button>确定</button>-->
      <!--</form>-->

      <!--ajax封装，上传，造了一个表单对象-->
      <label class="upBlock">
        <input type="file" @change="handleChange($event)" class="select">
        <img :src="imgPath" v-if="imgPath">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </label>

      <!--<div class="item">-->
      <!--<input type="text" placeholder="用户名" v-model="username">-->
      <!--</div>-->
      <!--<div class="item">-->
      <!--<input type="text" placeholder="邮箱" v-model="email">-->
      <!--</div>-->
      <!--<div class="item">-->
      <!--<input type="password" placeholder="密码" v-model="password">-->
      <!--</div>-->
      <div class="item">
        <el-button type="primary" class="el-btn" @click="handleConfirm">确定修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header';
  import cookies from 'js-cookie';

  export default {
    name: "modiInfor",
    components: {
      Header
    },
    data() {
      return {
        imgPath: '',
        avatar: ''
      }
    },
    methods: {
      handleChange($event) {
        // console.log($event.target.files);
        let file = $event.target.files[0];
        // file不是字符串，不能直接传过去，造一个表单对象，可以传一个表单
        let form = new FormData();
        form.append("avatar", file);
        this.$axios.post('/uploadPic', form,
          //需要指定请求头，因为axios传post 默认是application/json 的格式，，我们要用的是multipart/form-data 的格式
          {headers: {'content-type': "multipart/form-data"}}
        ).then(res => {
          // console.log(res);
          this.imgPath = `/api/${res.data.data}`;
          cookies.set('avatar',this.imgPath,{ expires: 14 });
        })
      },
      handleConfirm() {
        let params = {
          email: cookies.get('email'),
          avatar: this.imgPath
        };
        if (params) {
          this.$axios.post('/update', params).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message(res.data.msg);
              this.$router.push('/')
            }else{
              alert('修改失败');
            }
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .register-con {
    background: #fff;
    width: 710px;
    border-radius: 4px;
    margin: 100px auto 0;
    padding: 30px 0 50px;
    h2 {
      font-weight: 400;
      color: #333;
      text-align: center;
      display: block;
    }
    span {
      font-weight: 400;
      color: #333;
      display: block;
      margin-left: 50px;
    }
    .upBlock {
      width: 178px;
      display: block;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      margin-left: 168px;
      &:hover {
        border-color: #409EFF;
      }
      .select {
        display: none;
      }
      img {
        width: 178px;
        height: 178px;
        display: block;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
    }
    .item {
      box-sizing: border-box;
      width: 390px;
      margin-top: 30px;
      margin-left: 160px;
      input {
        box-sizing: border-box;
        width: 100%;
        outline: none;
        border: 1px solid #f1f1f1;
        border-radius: 4px;
        padding: 14px;
      }
      .el-btn {
        width: 100%;
      }
    }
  }
</style>
