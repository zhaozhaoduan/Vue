<template>
    <div>
        <el-radio-group v-model="radio2" @change="getVal">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
        </el-radio-group>

        <el-input
        placeholder="请输入内容"
        v-model="input10"
        clearable >
        </el-input>
        <el-input
        placeholder="请输入内容"
        v-model="input10"
        show-password>
        </el-input>

        <el-input-number v-model="num9" :precision="2" :step="0.1" :max="10"></el-input-number>
        <el-input-number v-model="num9"  :precision="2" :step="0.1" :max="10" @change="handleChange" controls-position='right'></el-input-number>

        <el-rate
        v-model="value5"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
        </el-rate>

        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data () {
        return {
            radio2: 9,
            input10: '',
            num9: 0,
            value5: 3.4
        }
    },
    methods: {
        getVal(value) {
            console.log(value)
        },
        handleChange(value) {
            console.log(value)
        }
    }
 }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
