<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>-->
                <!-- 用户头像 -->
                <div class="user-avator">
                    <!-- <img src="../../assets/img/photo.png" /> -->
                </div>
                <!-- 用户名下拉菜单 -->
                <!-- <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{ username }}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> -->
            </div>
        </div>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            dialogVisible: false,
            collapse: false,
            fullscreen: false,
            name: '',
            date: new Date(),
            message: 2,
            url: '',
            href: '',
            userInfo: JSON.parse(window.localStorage.getItem('user'))
        };
    },
    created() {
        this.username = this.userInfo ? this.userInfo.username : localStorage.getItem('ms_username');
    },

    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            this.url = this.$route.fullPath;
            this.href = window.location.href;
            let cur_url = this.url;
            if (cur_url.indexOf('?') > -1) {
                cur_url = cur_url.substring(0, cur_url.indexOf('?'));
            }
            // function setCookie(cname, cvalue, exdays) {
            //     var d = new Date();
            //     d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
            //     var expires = 'expires=' + d.toUTCString();
            //     document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/'; //path=/是根路径
            // }
            // function clearCookie(name) {
            //     setCookie(name, '', -1);
            // }
            if (command == 'loginout') {
                if (this.href.indexOf('iftappdev.foton') > -1) {
                    //测试
                    window.location.href = 'http://iftappdev.foton.com.cn/itbms_ui/login';
                    // window.location.href = 'http://testsso1.foton.com.cn:80/logout?service=http://iftappdev.foton.com.cn/itbms_ui/';
                    // 'http://testsso1.foton.com.cn:80/logout?service=http://iftappdev.foton.com.cn/itbms_ui/sso/login';
                } else {
                    //生产
                    window.location.href = 'http://sso.foton.com.cn:80/logout?service=http://elkprdyy.foton.com.cn/sso/login';
                }
            }
        },

        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', !this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleInfo() {
            this.dialogVisible = true;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 1px 21px;
    cursor: pointer;
    line-height: 50px;
}
.header .logo {
    float: left;
    font-size: 18px;
    width: 250px;
    line-height: 50px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 50px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
.info_list {
    line-height: 30px;
    /* letter-spacing: 2px; */
    /* line-height: 30px; */
}
.el-dialog__body {
    padding: 0 20px;
}
</style>
