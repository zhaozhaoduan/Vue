<template>
    <form action="">
        <slot></slot>
    </form>
</template>

<script>
export default {
    provide() {//把表单实例作为参数传递下去，子代可以直接使用
        return {
            form: this
        }
    },
    props: {
        model: {
            type: Object,
            required: true //必填
        },
        rules: {
            type: Object
        }
    }
}
</script>
