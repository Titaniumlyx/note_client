// 这个是 axios 的合并
import axios from 'axios'
import Vue from 'vue'

let env = process.env.NODE_ENV == 'development'? '开发环境': '生产环境';

let instance = axios.create({
  baseURL: process.env.NODE_ENV == 'development'? 'api': '/'
});

Vue.prototype.$axios = instance;
// vue的构造器函数 Vue.prototype 原型上
// 在 main.js 中引入    这是可以 用的时候用this.$axios 来用
