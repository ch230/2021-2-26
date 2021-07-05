<template>
    <div class="role_wrap">
        <div class="role_search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="pass">
                    <el-input
                        type="text"
                        size="small"
                        clearable
                        placeholder="请输入角色名称"
                        style="width: 170px"
                        v-model="ruleForm.pass"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="权限字符" prop="checkPass">
                    <el-input
                        type="password"
                        size="small"
                        placeholder="请输入权限字符"
                        clearable
                        style="width: 170px"
                        v-model="ruleForm.checkPass"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="age">
                    <el-select v-model="ruleForm.age" placeholder="角色状态" clearable size="small" style="width: 170px">
                        <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel" :value="dict.dictValue" />
                    </el-select>
                </el-form-item>

                <el-form-item label="创建时间" prop="time">
                    <el-date-picker
                        style="width: 220px"
                        v-model="ruleForm.time"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" size="small">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="role_button">
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <!-- @click="handleAdd" -->

                    <el-button type="primary" icon="el-icon-plus" size="mini">新增</el-button>
                </el-col>
                <el-col :span="1.5">
                    <!-- @click="handleUpdate" -->

                    <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single">修改</el-button>
                </el-col>
                <el-col :span="1.5">
                    <!-- @click="handleDelete" -->

                    <el-button type="danger" icon="el-icon-delete" size="mini" :disabled="multiple">删除</el-button>
                </el-col>
                <el-col :span="1.5">
                    <!-- @click="handleExport" -->

                    <el-button type="warning" icon="el-icon-download" size="mini">导出</el-button>
                </el-col>
                <el-col :span="1.5">
                    <!-- @click="handleCopy" -->

                    <el-button type="success" icon="el-icon-edit" size="mini" :disabled="single">复制</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="role_table">
            <!-- @selection-change="handleSelectionChange" -->
            <el-table v-loading="loading" :data="roleList">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column label="角色编号" prop="id" width="120" />
                <el-table-column label="角色名称" prop="name" :show-overflow-tooltip="true" width="150" />
                <el-table-column label="权限字符" prop="roleKey" :show-overflow-tooltip="true" width="150" />
                <el-table-column label="备注" prop="remark" width="150" />
                <el-table-column label="显示顺序" prop="roleSort" width="100" />
                <el-table-column label="状态" align="center" width="100">
                    <template v-slot="scope">
                        <el-switch
                            v-model="scope.row.status"
                            active-value="0"
                            inactive-value="1"
                            @change="handleStatusChange(scope.row)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" prop="createTime" width="180">
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

            <pagination v-show="total > 0" :total="total" :page="queryParams.pageNum" :limit="queryParams.pageSize" @pagination="getList" />
        </div>
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
    </div>
</template>
<script>
export default {
    name: 'role',
    data() {
        return {
            total: 0,
            loading: false,
            multiple: false,
            single: false,
            queryParams: {
                pageNum: 1,
                pageSize: 10
            },
            pageTotal: 0,
            roleList: [
                {
                    authority: 'ADMIN',
                    dataScope: '1',
                    delFlag: '0',
                    id: 1,
                    name: 'ADMIN',
                    roleSort: 0,
                    status: '0'
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
            ],
            ruleForm: {
                pass: '',
                checkPass: '',
                age: '',
                time: ''
            }
        };
    },
    methods: {
        getList() {},
        // 分页导航
        handlePageChange(val) {
            this.$set(this.queryParams, 'pageIndex', val);
            this.getData();
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
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.role_wrap {
}
.role_search,
.role_button {
    margin-left: 10px;
}
.role_button {
    margin-bottom: 10px;
}
</style>