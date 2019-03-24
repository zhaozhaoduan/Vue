<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <p v-if='error'>
            {{error}}
        </p>
    </div>
</template>

<script>
import Schema from 'async-validator';//导入做校验的插件

export default {
    inject: ['form'],
    props: {
        label: {
            type: String,
            default: ''
        },
        prop: {
            type: String,
        }
    },
    data () {
        return {
            error: ''
        }
    },
    mounted () {
        this.$on('validate', this.validate)
    },
    methods: {
        validate () {
            //执行具体校验工作
            //1.获取校验规则
            const rules = this.form.rules[this.prop]
            //2.获取校验数据
            const value = this.form.model[this.prop]
            //校验对象
            const descriptor = {[this.prop]: rules}
            //创建校验器
            const schema = new Schema(descriptor)
            //校验
            schema.validate({[this.prop]: value}, errors => {
                console.log('hello')
                if(errors) {
                    this.error = errors[0].message
                } else {
                    this.error   = ''
                }
            })
        }
    }
}
</script>
