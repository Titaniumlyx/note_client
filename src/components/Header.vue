<template>
<div class="header-container">
  <div class="block">
    <h1 class="fll">云笔记</h1>
    <div class="flr">
      <i class="iconfont icon-sousuo"></i>
      <el-button class="write-btn flr">写笔记</el-button>
    </div>
  </div>
</div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  .header-container{
    width: 100%;
    height: 50px;
    background: #409eff;
    .block{
      width: 1170px;
      margin: 0 auto;
      h1{
        color: #fff;
        font-weight: 500;
        line-height: 50px;
      }
      .iconfont{
        font-size: 30px;
        color: #fff;
        display: inline-block;
        margin-top: 6px;
        margin-right: 10px;
      }
      .write-btn{
        width: 80px;
        height: 35px;
        border: 1px solid #fff;
        border-radius: 3px;
        background: #fff;
        color: #333;
        font-size: 16px;
        margin-top: 6px;
      }
    }
  }
</style>
