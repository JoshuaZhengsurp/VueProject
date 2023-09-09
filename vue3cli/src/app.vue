<template>
    <div class="main">
        <el-upload class="upload-demp" active="#" :multiple="true" :before-upload="handleBeforeUpload"
            list-type="picture-card" :on-preview="handlePictureCardPreview" :http-request="customUploadRequest"
            >
            <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </el-upload>
    </div>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue';
const files = ref([]);
const handleBeforeUpload = (file) => {
    console.log('文件上传前的逻辑', file);
    // files.value.push(file)
}
// 图片预览
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}
const customUploadRequest = (file) => {
    files.value.push(file)
    console.log('请求发送', file, files)
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}

body,
html {
    height: 100%;
    margin: 0;
}

.main {
    display: flex;
    height: 100vh;
    background-color: black;
}
</style>