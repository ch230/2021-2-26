<template>
    <div class="wei_wrap">
        <div class="wei_search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="部门" prop="dept">
                    <el-select v-model="ruleForm.dept" placeholder="请选择部门" clearable size="small" style="width: 170px">
                        <el-option v-for="dict in deptOption" :key="dict.deptValue" :label="dict.deptLabel" :value="dict.deptValue" />
                    </el-select>
                </el-form-item>
                <el-form-item label="展示类型" prop="showType">
                    <el-select v-model="ruleForm.showType" placeholder="请选择职级" clearable size="small" style="width: 170px">
                        <el-option v-for="dict in showOption" :key="dict.showValue" :label="dict.showLabel" :value="dict.showValue" />
                    </el-select>
                </el-form-item>
                <el-form-item label="显示类型" prop="type">
                    <el-select
                        v-model="ruleForm.type"
                        placeholder="请选择职级"
                        clearable
                        size="small"
                        style="width: 170px"
                        @change="handleChange"
                    >
                        <el-option v-for="dict in typeOption" :key="dict.typeValue" :label="dict.typeLabel" :value="dict.typeValue" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small">搜索</el-button>
                    <el-button type="warning" size="small">导出</el-button>
                </el-form-item>
            </el-form>
        </div>
        <v2-tree :sources="sources" @handleClick="handleClick" @handleRemove="removeItem" @handleAdd="addChild"></v2-tree>

        <div class="leader_dialog">
            <el-dialog :visible.sync="dialogVisible" width="800px">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="基本信息" name="first">
                        <div class="message">
                            <ul class="left">
                                <li>
                                    <b>姓名</b>
                                    <span>张三</span>
                                </li>
                                <li>
                                    <b>年龄</b>
                                    <span>23</span>
                                </li>
                                <li>
                                    <b>政治面貌</b>
                                    <span>群众</span>
                                </li>
                                <li>
                                    <b>民族</b>
                                    <span>汉族</span>
                                </li>
                                <li>
                                    <b>婚姻状况</b>
                                    <span>是</span>
                                </li>
                                <li>
                                    <b>最高学历</b>
                                    <span>本科</span>
                                </li>
                            </ul>
                            <ul class="right">
                                <li>
                                    <b>性别</b>
                                    <span>女</span>
                                </li>
                                <li>
                                    <b>出生日期</b>
                                    <span>2021年6月21日</span>
                                </li>
                                <li>
                                    <b>入党日期</b>
                                    <span>2021年6月21日</span>
                                </li>
                                <li>
                                    <b>籍贯</b>
                                    <span>河北</span>
                                </li>
                                <li>
                                    <b>第一学历</b>
                                    <span>本科</span>
                                </li>
                                <li>
                                    <b>身份证号</b>
                                    <span>64389</span>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="职务信息" name="second">
                        <div class="message">
                            <ul class="left">
                                <li>
                                    <b>单位</b>
                                    <span>福田</span>
                                </li>
                                <li>
                                    <b>职务</b>
                                    <span>经理</span>
                                </li>
                                <li>
                                    <b>职级</b>
                                    <span>L</span>
                                </li>
                                <li>
                                    <b>进入福田途径</b>
                                    <span>校招</span>
                                </li>
                            </ul>
                            <ul class="right">
                                <li>
                                    <b>进入福田时间</b>
                                    <span>2021年6月21</span>
                                </li>
                                <li>
                                    <b>首次参加工作时间</b>
                                    <span>2021年6月21日</span>
                                </li>
                                <li>
                                    <b>社会工龄</b>
                                    <span>11年</span>
                                </li>
                                <li>
                                    <b>福田工龄</b>
                                    <span>3年</span>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="工作经历" name="third">
                        <div class="message">
                            <ul class="left">
                                <li>2001年到2004年 就职于时代事业部</li>
                                <li>2004年到2021年 就职于普罗科事业部</li>
                            </ul>
                            <!-- <ul class="right">
                <li>
                  <b>来福田后工作经历</b>
                </li>
              </ul> -->
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="个人绩效" name="fourth">
                        <div class="message">
                            <ul>
                                <li>
                                    <b>年度绩效</b>
                                    A(80%)
                                </li>
                                <li>
                                    <b>季度绩效</b>
                                    A(80%)
                                </li>
                                <li>
                                    <b>月度绩效</b>
                                    A(80%)
                                </li>
                            </ul>
                            <!-- <ul class="right">
                <li>
                  <b>季度绩效</b>
                </li>
              </ul> -->
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="干部考评" name="five">
                        <div class="message">
                            <ul class="left">
                                <li>
                                    <b style="display: inline-block; width: 120px">招聘试用期考评</b>
                                    A(80%)
                                </li>
                                <li>
                                    <b style="display: inline-block; width: 120px">任职试用期考评</b>
                                    A(80%)
                                </li>
                                <li>
                                    <b>年度干部考评</b>
                                    A(80%)
                                </li>
                            </ul>
                            <!-- <ul class="right">
                <li>
                  <b>来福田后工作经历</b>
                </li>
              </ul> -->
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="社会关系及主要家庭成员" name="six">
                        <el-table :data="familyData">
                            <el-table-column prop="title" label="称谓"></el-table-column>
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <el-table-column prop="age" label="年龄"></el-table-column>
                            <el-table-column prop="brithday" label="出生日期"></el-table-column>
                            <el-table-column prop="politics" label="政治面貌"></el-table-column>
                            <el-table-column prop="unit" label="工作单位及职务"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import data from '../../utils/data';
export default {
    name: 'position',
    data() {
        return {
            data: {
                id: 0,
                label: 'XXX科技有限公司',
                children: [
                    {
                        id: 2,
                        label: '产品研发部',
                        children: [
                            {
                                id: 5,
                                label: '研发-前端'
                            },
                            {
                                id: 6,
                                label: '研发-后端'
                            },
                            {
                                id: 9,
                                label: 'UI设计'
                            },
                            {
                                id: 10,
                                label: '产品经理'
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: '销售部',
                        children: [
                            {
                                id: 7,
                                label: '销售一部'
                            },
                            {
                                id: 8,
                                label: '销售二部'
                            }
                        ]
                    },
                    {
                        id: 4,
                        label: '财务部'
                    },
                    {
                        id: 9,
                        label: 'HR人事'
                    }
                ]
            },
            isShowModal: false,
            sources: data,
            va: [],
            ruleForm: {
                dept: '',
                rank: '',
                showType: '',
                type: ''
            },
            //展示类型
            showOption: [
                {
                    showValue: '1',
                    showLabel: '全部'
                },
                {
                    showValue: '2',
                    showLabel: '部分'
                }
            ],
            //显示类型
            typeOption: [
                {
                    typeValue: '1',
                    typeLabel: '照片版'
                },
                {
                    typeValue: '2',
                    typeLabel: '简化版'
                }
            ],
            deptOption: [
                {
                    deptValue: '1',
                    deptLabel: '集团领导层'
                },
                {
                    deptValue: '2',
                    deptLabel: '其他'
                },
                {
                    deptValue: '3',
                    deptLabel: '集团只能/业务副总裁'
                },
                {
                    deptValue: '4',
                    deptLabel: 'BU'
                },
                {
                    deptValue: '5',
                    deptLabel: 'FU'
                },
                {
                    deptValue: '6',
                    deptLabel: 'SBU'
                },
                {
                    deptValue: '7',
                    deptLabel: 'C'
                }
            ],
            rankOption: [
                { rankValue: '1', rankLabel: 'A' },
                { rankValue: '2', rankLabel: 'B' },
                { rankValue: '380', rankLabel: 'C' },
                { rankValue: '484', rankLabel: 'L1' },
                { rankValue: '500', rankLabel: 'L2' },
                { rankValue: '1048', rankLabel: 'L3.1' },
                { rankValue: '735', rankLabel: 'L3.2' },
                { rankValue: '580', rankLabel: 'L4.1' },
                { rankValue: '84', rankLabel: 'L4.2' }
            ],

            activeName: 'first',
            dialogVisible: false,
            familyData: [
                {
                    title: '父亲',
                    name: '张三',
                    age: '41',
                    brithday: '1918年8月12日',
                    politics: '党员',
                    unit: '沙河镇'
                }
            ]
        };
    },
    mounted() {
        this.toggleExpand(this.data, true);
    },
    methods: {
        NodeClick(e, data) {
            console.log(e);
            // e 为 event
            console.log(data);
            // 当前项的所有详情 如：id label children
        },
        collapse(list) {
            var _this = this;
            list.forEach(function (child) {
                if (child.expand) {
                    child.expand = false;
                }
                child.children && _this.collapse(child.children);
            });
        },
        onExpand(e, data) {
            if ('expand' in data) {
                data.expand = !data.expand;
                if (!data.expand && data.children) {
                    this.collapse(data.children);
                }
            } else {
                this.$set(data, 'expand', true);
            }
        },
        toggleExpand(data, val) {
            var _this = this;
            if (Array.isArray(data)) {
                data.forEach(function (item) {
                    _this.$set(item, 'expand', val);
                    if (item.children) {
                        _this.toggleExpand(item.children, val);
                    }
                });
            } else {
                this.$set(data, 'expand', val);
                if (data.children) {
                    _this.toggleExpand(data.children, val);
                }
            }
        },
        handleChange(e) {},
        handleClick(res) {
            this.dialogVisible = true;
            console.log(res);
        },
        /**
         * 添加节点
         * params: {
         *  type: 1|2     1是添加兄弟节点 2是添加节点
         *  name: '金字塔'   节点名称
         * }
         * obj: {
         *  data: {}    当前操作的对象
         *  parent: []  当前操作的对象的父级数据
         *  index: 1    当前操作对象的索引
         * }
         * closeModalCallback   关闭弹窗的回调参数
         */
        addChild({ params, form, closeModalCallback }) {
            if (form.type == 2) {
                if (!params.data.childs) {
                    this.$set(params.data, 'childs', []);
                }
                params.data.childs.push({ name: form.name });
            } else {
                params.parent.push({ name: form.name });
            }
            closeModalCallback();
        },
        /***
         *  删除节点
         *  data: {}    当前操作的对象
         *  parent: []  当前操作的对象的父级数据
         *  index: 1    当前操作对象的索引
         */
        removeItem(data, parent, index) {
            parent.splice(index, 1);
        },
        handleShowModal() {
            this.isShowModal = true;
        }
    },
    created() {
        this.$root.sources = data;
    },
    computed: {}
};
</script>

<style scoped>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
.wei_search {
    margin-left: 10px;
}
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
    width: 90px;
}
ul li {
    list-style: none;
}
</style>

