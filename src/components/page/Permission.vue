<template>
    <div class="permission_wrap">
        <div class="permission_search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="菜单名称" prop="name">
                    <el-input
                        type="text"
                        size="small"
                        clearable
                        placeholder="请输入角色名称"
                        style="width: 170px"
                        v-model="ruleForm.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="接口地址" prop="url">
                    <el-input
                        type="password"
                        size="small"
                        placeholder="请输入权限字符"
                        clearable
                        style="width: 170px"
                        v-model="ruleForm.url"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="角色状态" clearable size="small" style="width: 170px">
                        <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="permission_table">
            <el-table v-loading="loading" :data="menuList" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="name" label="菜单名称" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="icon" label="图标" align="center" width="100px">
                    <!-- <template v-slot="scope">
                        <svg-icon :icon-class="scope.row.icon" />
                    </template> -->
                </el-table-column>
                <el-table-column prop="orderNum" label="排序" width="60px"></el-table-column>
                <el-table-column prop="perms" label="权限标识" width="130px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="component" label="组件路径" width="180px" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="url" label="接口地址" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="visible" label="可见" :formatter="visibleFormat" width="80px"></el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" width="180">
                    <template v-slot="scope">
                        <span>{{ parseTime(scope.row.createTime) }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
                    <!-- v-slot="scope" -->
                    <template>
                        <el-button size="mini" type="text" icon="el-icon-edit">修改</el-button>
                        <el-button size="mini" type="text" icon="el-icon-plus">新增</el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="queryParams.pageNum"
                    :page-size="queryParams.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
            <!-- <pagination
        v-show="total > 0"
        :total="total"
        :page="queryParams.pageNum"
        :limit="queryParams.pageSize"
        @pagination="getList"
      /> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'permission',
    data() {
        return {
            loading: false,
            pageTotal: 0,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            ruleForm: {
                name: '',
                url: '',
                status
            },
            menuList: [
                {
                    createTime: '2019-12-25 17:25:54',
                    icon: 'system',
                    id: 1,
                    isFrame: 1,
                    menuType: 'M',
                    name: '系统管理',
                    orderNum: 0,
                    parentId: 0,
                    path: 'system',
                    visible: '0',
                    children: [
                        {
                            component: 'system/user/index',
                            createTime: '2019-12-25 17:25:54',
                            icon: 'user',
                            id: 3,
                            isFrame: 1,
                            menuType: 'C',
                            name: '用户管理',
                            orderNum: 1,
                            parentId: 1,
                            path: 'user',
                            perms: 'system:user:list',
                            visible: '0'
                        }
                    ]
                }
            ],
            statusOptions: [
                {
                    createBy: 'admin',
                    createTime: '2018-03-16 11:33:00',
                    dictCode: 105,
                    dictLabel: '正常',
                    dictSort: 1,
                    dictType: 'sys_normal_disable',
                    dictValue: '0',
                    isDefault: 'Y',
                    listClass: 'primary',
                    remark: '正常状态',
                    status: '0'
                },
                {
                    createBy: 'admin',
                    createTime: '2018-03-16 11:33:00',
                    dictCode: 106,
                    dictLabel: '停用',
                    dictSort: 2,
                    dictType: 'sys_normal_disable',
                    dictValue: '1',
                    isDefault: 'N',
                    listClass: 'danger',
                    remark: '停用状态',
                    status: '0'
                }
            ]
        };
    },
    methods: {
        visibleFormat() {},
        // <el-table-column prop="visible" label="可见" :formatter="visibleFormat" width="80px"></el-table-column>

        // 分页导航
        handlePageChange(val) {
            this.$set(this.queryParams, 'pageIndex', val);
            this.getData();
        },
        submitForm() {
            console.log('搜索');
        },
        parseTime(time, pattern) {
            if (arguments.length === 0) {
                return null;
            }
            const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
            let date;
            if (typeof time === 'object') {
                date = time;
            } else {
                if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
                    time = parseInt(time);
                }
                if (typeof time === 'number' && time.toString().length === 10) {
                    time = time * 1000;
                }
                date = new Date(time);
            }
            const formatObj = {
                y: date.getFullYear(),
                m: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                i: date.getMinutes(),
                s: date.getSeconds(),
                a: date.getDay()
            };
            const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
                let value = formatObj[key];
                // Note: getDay() returns 0 on Sunday
                if (key === 'a') {
                    return ['日', '一', '二', '三', '四', '五', '六'][value];
                }
                if (result.length > 0 && value < 10) {
                    value = '0' + value;
                }
                return value || 0;
            });
            return time_str;
        }
    }
};
</script>

<style scoped>
h1 {
    text-align: center;
    margin: 30px 0;
}
p {
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.permission_search {
    margin-left: 10px;
}
.logout {
    color: #409eff;
}
</style>