<template>
    <div class="form_wrap">
        <div class="form_search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="单位" prop="unit">
                    <el-input
                        type="text"
                        size="small"
                        clearable
                        placeholder="请输入单位"
                        style="width: 170px"
                        v-model="ruleForm.unit"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="办公地点" prop="name">
                    <el-input
                        type="text"
                        size="small"
                        clearable
                        placeholder="请输入姓名"
                        style="width: 170px"
                        v-model="ruleForm.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="干部属性" prop="cadreProperties">
                    <el-select v-model="ruleForm.cadreProperties" placeholder="请选择">
                        <el-option key="1" label="党委干部" value="1"></el-option>
                        <el-option key="2" label="行政干部" value="2"></el-option>
                        <el-option key="3" label="团委干部" value="3"></el-option>
                        <el-option key="4" label="项目群干部" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期" prop="birthday">
                    <el-date-picker
                        style="width: 220px"
                        v-model="ruleForm.birthday"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small">搜索</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="danger" size="small">重置</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="warning" size="small">导出</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="success" size="small">预览</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="form_table" style="text-align: center">
            <table border="1" width="100%" height="auto" cellspacing="0" align="center">
                <tr>
                    <td rowspan="2">单位</td>
                    <td rowspan="2">干部分类</td>
                    <td rowspan="2">总数合计</td>
                    <td>A</td>
                    <td>B</td>
                    <td colspan="4">C集团总裁</td>
                    <td>L1</td>
                    <td>L2</td>
                    <td colspan="3">L3</td>
                    <td colspan="3">L4</td>
                    <td colspan="3">L5</td>
                </tr>
                <tr>
                    <td>集团总经理/党委书记</td>
                    <td>集团副总经理/党委副书记/纪委书记</td>
                    <td>总计</td>
                    <td>C1</td>
                    <td>C2</td>
                    <td>C</td>
                    <td>正职</td>
                    <td>副职</td>
                    <td>总计</td>
                    <td>L3.1</td>
                    <td>L3.2</td>
                    <td>总计</td>
                    <td>L4.1</td>
                    <td>L4.2</td>
                    <td>总计</td>
                    <td>L5.1</td>
                    <td>L5.2</td>
                </tr>
                <tr>
                    <td rowspan="6">党政干部总量</td>
                    <td>行政干部</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>党委干部</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>本月合计</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>上月合计</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>差额</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>

                <tr>
                    <td colspan>其中:</td>

                    <td colspan="18"></td>
                </tr>
                <tr>
                    <td rowspan="19">党政干部总量</td>
                    <td colspan="2">新招聘社会人才</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td rowspan="6">晋升</td>
                    <td>组织提拔</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>竞聘上岗</td>

                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>职位调整</td>

                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>小计</td>

                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>其中:1.专业技术人员提拔为干</td>

                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>其中:2.其中单位调入晋升</td>

                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td rowspan="7">降职/降级</td>
                    <td>优化调整</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>组织机构调整/职级调整</td>

                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>小计</td>

                    <td>0</td>
                    <td>0</td>

                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>其中:1.干部免聘为专业技术人员</td>

                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'statisticalForm',
    data() {
        return {
            activeName: 'first',
            messageFlag: false,
            messageForm: {
                birthday: '',
                period: '',
                type: '',
                dutyType: ''
            },
            ruleForm: {
                unit: '',
                name: '',
                sex: '',
                duty: '',
                rank: '',
                age: '',
                credentials: '',
                birthday: '',
                politicsStatus: '',
                tenure: '', //任期
                cadreProperties: '', //干部属性
                workPlace: '' //办公地点
            },
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            }
        };
    },
    created() {},
    mounted() {},
    methods: {
        handleLook() {
            console.log(1);
            this.messageFlag = true;
            console.log(this.messageFlag);
        },
        submitForm() {},
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleChange(e) {
            if (e == 1) {
                this.partFlag = true;
                this.externalFlag = false;
            } else if (e == 2) {
                this.partFlag = false;
                this.externalFlag = true;
            } else {
                this.partFlag = true;
                this.externalFlag = true;
            }
        }
    }
};
</script>

<style scoped>
.message {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.message li {
    line-height: 30px;
}
.message li b {
    font-weight: normal;
    display: inline-block;
    width: 140px;
}
.jixiao td {
    text-align: center;
    width: 85px;
}
ul li {
    list-style: none;
}
.handle-box {
    margin-bottom: 20px;
}
.leader_search {
    margin-left: 10px;
}
.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
table {
    table-layout: fixed;
}
table {
    border-collapse: collapse;
}
.check {
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>
