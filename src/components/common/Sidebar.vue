<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    index: 'role',
                    title: '角色管理'
                },
                {
                    index: 'permission',
                    title: '权限管理'
                },
                {
                    index: 'group',
                    title: '部门管理'
                },

                {
                    index: 'leader',
                    title: '干部管理'
                },
                {
                    index: 'change',
                    title: '变动管理'
                },
                {
                    index: 'dimensional',
                    title: '维度分析'
                },
                // {
                //     index: 'position',
                //     title: '职位架构'
                // },
                {
                    index: 'tree',
                    title: '职位架构'
                },
                {
                    index: 'statisticalForm',
                    title: '统计报表'
                }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },

    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    height: 100%;
    display: block;
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 0;
    width: 175px;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    display: none;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 175px;
}
.sidebar > ul {
    height: 100%;
}
.sidebar > ul {
    padding-left: 30px;
}
</style>
