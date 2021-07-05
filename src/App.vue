<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created() {},
    methods: {}
};
</script>
<style>
@import './assets/css/main.css';
@import './assets/css/color-dark.css';
/*深色主题*/
/* @import "./assets/css/theme-green/color-green.css";   浅绿色主题 */
.content-box {
    background: #ffffff;
}
.el-table--mini,
.el-table--small,
.el-table__expand-icon {
    font-size: 13px !important;
}
.el-form-item__label {
    font-size: 13px !important;
}
ul,
ol {
    list-style: none;
}
</style>
