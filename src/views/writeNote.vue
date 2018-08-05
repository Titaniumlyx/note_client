<template>
<div class="writeContainer">
  <Header></Header>
  <div class="write-wrap">
    <div class="write-block">
      <div class="title-wrap">
        <div class="title-label">标题</div>
        <input type="text" placeholder="请输入笔记标题" v-model="title">
      </div>
      <div class="bijiCon clearfix">
        <div class="title-label">内容</div>
        <div class="editBox">
          <quillEditor
            v-model="content"
            :options="editorOption"
            @change="onEditorChange($event)">
            ></quillEditor>
        </div>
        <div class="labels clearfix">
          <span class="labels-title fll">标签：</span>
          <el-checkbox-group v-model="checkboxLabel" size="small">
            <el-checkbox-button v-for="label in labels" :label="label" :key="label">{{label}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <el-button type="primary" @click="handleSubmit">发布笔记</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import  Header from '../components/Header'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import cookies from 'js-cookie';

  import { quillEditor } from 'vue-quill-editor'

  const allLabel = ['vue', 'react', 'java', 'script'];

  export default {
    name: "writeNote",
    components: {
      quillEditor,Header
    },
    data(){
      return{
        title: "",
        content: "",
        contentText: "",
        checkboxLabel: ['vue'],
        labels: allLabel,
        editorOption:{
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          },
        }
      }
    },
    methods: {
      onEditorChange({ quill, html, text }) {
        this.contentText = text.substring(0,150) + '...'
      },
      handleSubmit(){
        let params = {
          title: this.title,
          content: this.content,
          contentText: this.contentText,
          userPic: cookies.get('avatar'),
          author : cookies.get('username')
        }
        this.$axios.post('/article',params).then(res => {
          // console.log(res);
          if(res.data.code == 200){
            this.$message.success('发布笔记成功');
            setTimeout(() => {
              this.$router.push('/')
            },500)
          }else{
            alert(res.data.msg);
          }
        })
      },
    }
  }
</script>

<style lang="scss">
  .quill-editor{
    .ql-container{
      min-height: 300px;
    }
  }
</style>
<style scoped lang="scss">
  *{
    margin: 0;
    padding: 0;
  }
  .el-checkbox-button{
    margin-right: 20px;
  }
  .el-button{
    margin-top: 20px;
    padding: 12px 20px;
  }
  .ql-container{
    min-height: 300px;
  }
  .write-wrap{
    width: 1170px;
    margin: 0 auto;
    .write-block{
      margin-top: 30px;
      background: #fff;
      box-sizing: border-box;
      padding: 8px 24px;
      border-radius: 4px;
      .title-label{
        margin-top: 6px;
        color: #333;
        font-size: 20px;
        font-weight: 700;
      }
      .title-wrap{
        input{
          margin-top: 10px;
          border: 1px solid #eee;
          border-radius: 4px;
          box-sizing: border-box;
          width: 100%;
          line-height: 40px;
          padding: 0 6px;
          font-size: 16px;
          color: #555;
        }
      }
      .bijiCon{
        .editBox{
          margin-top: 10px;
        }
        .labels{
          margin-top: 10px;
          .labels-title{
            color: #409eff;
            font-size: 16px;
            font-weight: 700;
          }
        }
      }
    }
  }
</style>
