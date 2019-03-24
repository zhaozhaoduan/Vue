<template>
    <div>
        <h2>Kform</h2>
        <k-form :model="model" :rules="rules" ref='kkbLoginForm'>
            <k-form-item label="用户名" prop='username'>
                <k-input v-model="model.username" ></k-input>
            </k-form-item>
            <k-form-item label="密码" prop='password'>
                <k-input type="password" v-model="model.password" ></k-input>
            </k-form-item>
        </k-form>
       

        <hr>
        <h3>Element表单</h3>
        <hr>
        <el-form :model="model" :rules="rules" ref="loginForm">
            <el-form-item label='用户名' prop='username'>
                <el-input v-model='model.username'></el-input>
            </el-form-item>

            <el-form-item label='密码' prop='password'>
                <el-input type='password' v-model='model.password'></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type='primary' @click="submitForm('loginForm')">提交</el-button>
            </el-form-item>
        </el-form>

        
        
    </div>
</template>

<script>
import KInput from './KInput.vue'
import KFormItem from './KFormItem.vue'
import KForm from './KForm.vue'
export default {
    data () {
        return {
            model: {
                username: '',
                password: ''
            },
            rules: {
                username: [{required: true, message: '请输入用户名'}],
                password: [{required: true, message: '请输入密码'}]
            }
        }
    },
    methods: {
        submitForm (form) {
            //console.log(this.$refs[form])
            this.$refs[form].validate(valid => {
                if(valid) {
                    alert('请求登陆')
                } else {
                    alert('校验失败')
                }
            })
        }
    },
    components: {
        KInput,KFormItem,KForm
    }
}
</script>

