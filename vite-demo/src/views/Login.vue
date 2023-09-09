<template>
    <!-- LOGIN -->
    <div class="login">
        <el-card class="box-card">
            <el-form ref="form" :rules="rules" :model="formInline" class="demo-form-inline">
                <el-form-item prop="user" label="账号">
                    <el-input v-model="formInline.user" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input v-model="formInline.password" type="password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import loadingBar from '../components/loadingBar.vue'
import type { FormItemRule, FormInstance } from 'element-plus'



type From = {
    user: string,
    password: string
}

type Rules = {
    [K in keyof From]?: Array<FormItemRule>
}

const form = ref<FormInstance>();
const router = useRouter();
const formInline = reactive<From>({
    user: '',
    password: '',
})

const rules = reactive<Rules>({
    user: [
        {
            required: true,
            message: '请输入账号',
            type: 'string',
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            type: 'string',
        }
    ]
})

const onSubmit = () => {
    console.log('onSubmit', form.value)
    // 
    form.value?.validate((validate) => {
        console.log(validate)
        if (validate) {
            router.push('/index');
            localStorage.setItem(
                'token', '1',
            )
        }
    })
}
</script>

<style scoped lang="less">
.login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>