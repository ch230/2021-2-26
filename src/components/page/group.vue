<template>
    <div class="group_wrap">
        <div class="group_search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="部门" prop="groupname">
                    <el-input
                        type="text"
                        size="small"
                        clearable
                        placeholder="请输入部门名称"
                        style="width: 170px"
                        v-model="ruleForm.groupname"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="单位" prop="groupname">
                    <el-input
                        type="text"
                        size="small"
                        clearable
                        placeholder="请输入部门名称"
                        style="width: 170px"
                        v-model="ruleForm.groupname"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="部门编号" prop="groupname">
                    <el-input
                        type="text"
                        size="small"
                        clearable
                        placeholder="请输入部门名称"
                        style="width: 170px"
                        v-model="ruleForm.groupname"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <!-- <el-form-item label="状态" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="角色状态" clearable size="small" style="width: 170px">
                        <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
                    </el-select>
                </el-form-item> -->

                <el-form-item>
                    <el-button type="primary" size="small">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table
            v-loading="loading"
            :data="deptList"
            row-key="id"
            lazy
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
            <el-table-column prop="orderNo" label="序号" width="100"></el-table-column>
            <el-table-column prop="orgName" label="单位" width="200"></el-table-column>

            <el-table-column prop="orgName" label="部门名称" width="200"></el-table-column>

            <el-table-column prop="orgNumber" label="部门编号" width="200"></el-table-column>
            <el-table-column prop="orgStatus" label="状态" :formatter="statusFormat" width="100"></el-table-column>

            <el-table-column prop="orgFullPath" label="部门全路径" width="200"></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" width="200">
                <template v-slot="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template v-slot="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit">修改</el-button>
                    <el-button size="mini" type="text" icon="el-icon-plus">新增</el-button>
                    <el-button v-if="scope.row.parentId != 0" size="mini" type="text" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="total, prev, pager, next"
                :current-page="query.pageIndex"
                :page-size="query.pageSize"
                :total="pageTotal"
                @current-change="handlePageChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'group',
    data() {
        return {
            pageTotal: 0,
            loading: false,
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            ruleForm: {
                groupname: '',
                status: ''
            },
            deptList: [
                {
                    alterTime: '2021-05-10 11:06:41',
                    createTime: '2020-01-27 17:25:26',
                    delFlag: 0,
                    hasChildren: true,
                    hierarchyId: 2,
                    id: 2,
                    isSync: 1,
                    modifyTimestamp: '20210510110641Z',
                    orderNo: 1,
                    orgFullPath: 'foton/福田戴姆勒',
                    orgName: '福田戴姆勒',
                    orgNameEn: 'FotonDaimler',
                    orgNumber: '245',
                    orgShortName: '福田戴姆勒',
                    orgStatus: '1',
                    parentId: 1,
                    parentOrgNumber: '00000000000000000000',
                    perLevel: 1
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
        statusFormat() {},
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
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
.group_search {
    margin-left: 10px;
}
</style>