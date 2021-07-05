<template>
    <div class="change_wrap">
        <div class="change_search">
            <el-form :model="adjustForm" :inline="true" ref="adjustForm" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input
                        type="text"
                        size="small"
                        clearable
                        placeholder="请输入姓名"
                        style="width: 170px"
                        v-model="adjustForm.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="调整后职级" prop="later">
                    <el-select v-model="adjustForm.later" placeholder="请选择">
                        <el-option key="bbk" label="A" value="bbk"></el-option>
                        <el-option key="xtc" label="B" value="xtc"></el-option>
                        <el-option key="imoo" label="C" value="imoo"></el-option>

                        <el-option key="bbk1" label="La" value="bbk1"></el-option>
                        <el-option key="xtc2" label="L1" value="xtc2"></el-option>
                        <el-option key="imoo3" label="L2" value="imoo3"></el-option>

                        <el-option key="bbk2" label="L3.1" value="bbk2"></el-option>
                        <el-option key="xtc1" label="L3.2" value="xtc1"></el-option>
                        <el-option key="imoo2" label="L4.1" value="imoo2"></el-option>

                        <el-option key="imoo1" label="L4.2" value="imoo1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="原职级" prop="before">
                    <el-select v-model="adjustForm.before" placeholder="请选择">
                        <el-option key="bbk" label="A" value="bbk"></el-option>
                        <el-option key="xtc" label="B" value="xtc"></el-option>
                        <el-option key="imoo" label="C" value="imoo"></el-option>

                        <el-option key="bbk1" label="La" value="bbk1"></el-option>
                        <el-option key="xtc2" label="L1" value="xtc2"></el-option>
                        <el-option key="imoo3" label="L2" value="imoo3"></el-option>

                        <el-option key="bbk2" label="L3.1" value="bbk2"></el-option>
                        <el-option key="xtc1" label="L3.2" value="xtc1"></el-option>
                        <el-option key="imoo2" label="L4.1" value="imoo2"></el-option>

                        <el-option key="imoo1" label="L4.2" value="imoo1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="调整情况" prop="condition">
                    <el-select v-model="adjustForm.condition" placeholder="请选择">
                        <el-option key="1" label="新招聘社会人才" value="1"></el-option>
                        <el-option key="2" label="晋升" value="2"></el-option>
                        <el-option key="3" label="降职" value="3"></el-option>

                        <el-option key="4" label="平调" value="4"></el-option>
                        <el-option key="5" label="兼职变化" value="5"></el-option>
                        <el-option key="6" label="免任" value="6"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="调整原因" prop="reason">
                    <el-select v-model="adjustForm.reason" placeholder="请选择">
                        <el-option key="1" label="新招聘社会人才啊" value="1"></el-option>
                        <!-- <el-option key="bbk" label="A" value="bbk"></el-option>
                        <el-option key="xtc" label="B" value="xtc"></el-option>
                        <el-option key="imoo" label="C" value="imoo"></el-option>

                        <el-option key="bbk1" label="La" value="bbk1"></el-option>
                        <el-option key="xtc2" label="L1" value="xtc2"></el-option>
                        <el-option key="imoo3" label="L2" value="imoo3"></el-option>

                        <el-option key="bbk2" label="L3.1" value="bbk2"></el-option>
                        <el-option key="xtc1" label="L3.2" value="xtc1"></el-option>
                        <el-option key="imoo2" label="L4.1" value="imoo2"></el-option> -->
                    </el-select>
                </el-form-item>

                <el-form-item label="其中" prop="among">
                    <el-select v-model="adjustForm.among" placeholder="请选择">
                        <el-option key="1" label="新招聘社会人才其中" value="1"></el-option>
                        <el-option key="2" label="晋升其中" value="2"></el-option>
                        <el-option key="3" label="降职其中" value="3"></el-option>
                        <el-option key="4" label="平调其中" value="4"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="轮岗原因" prop="workShiftReason">
                    <el-select v-model="adjustForm.workShiftReason" placeholder="请选择">
                        <el-option key="1" label="发展型" value="1"></el-option>
                        <el-option key="2" label="优化型" value="2"></el-option>
                        <el-option key="3" label="任满期" value="3"></el-option>
                        <el-option key="4" label="其他" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="轮岗形式" prop="workShiftType">
                    <el-select v-model="adjustForm.workShiftType" placeholder="请选择">
                        <el-option key="1" label="本单位本系统" value="1"></el-option>
                        <el-option key="2" label="仅跨单位" value="2"></el-option>
                        <el-option key="3" label="仅跨系统" value="3"></el-option>
                        <el-option key="4" label="跨单位跨系统" value="4"></el-option>
                        <el-option key="5" label="本单位增加业务范围" value="5"></el-option>
                        <el-option key="6" label="跨单位增加业务范围" value="6"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="日期" prop="time">
                    <el-date-picker
                        style="width: 220px"
                        v-model="adjustForm.time"
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
                    <el-button type="success" size="small">导入</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small">编辑</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" size="small">重置</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="warning" size="small">导出</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="change_table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="unit" label="序号"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="duty" label="调整后人事关系所在单位"> </el-table-column>
                <el-table-column prop="rank" label="调整后职级"></el-table-column>
                <el-table-column prop="age" label="调整后职务"> </el-table-column>
                <el-table-column prop="credentials" label="原单位"></el-table-column>
                <el-table-column prop="politicsStatus" label="原担任职务"></el-table-column>
                <el-table-column prop="tenure" label="原职级"> </el-table-column>
                <el-table-column prop="cadreProperties" label="调整情况"></el-table-column>
                <el-table-column prop="workPlace" label="调整原因"></el-table-column>

                <el-table-column prop="cadreProperties" label="其中"></el-table-column>
                <el-table-column prop="workPlace" label="任免文号"></el-table-column>

                <el-table-column prop="cadreProperties" label="任免时间"></el-table-column>
                <el-table-column prop="workPlace" label="任职试用期开始时间"></el-table-column>

                <el-table-column prop="cadreProperties" label="晋升干部是否破格"></el-table-column>
                <el-table-column prop="workPlace" label="破格项"></el-table-column>

                <el-table-column prop="cadreProperties" label="轮岗类型"></el-table-column>
                <el-table-column prop="workPlace" label="轮岗形式"></el-table-column>
                <el-table-column prop="workPlace" label="备注"></el-table-column>
            </el-table>
        </div>
        <div class="change_dialog">
            <el-dialog title="新增" :visible.sync="messageFlag" width="1000px">
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
                                <li>
                                    <b>档案所在地</b>
                                    <span>沙河工厂</span>
                                </li>
                                <li>
                                    <b>干部属性</b>
                                    <span>党委干部</span>
                                </li>
                                <li>
                                    <b>退休时间</b>
                                    <span>2022年10月12日</span>
                                </li>
                                <li>
                                    <b>党内职务</b>
                                    <span>委员</span>
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
                                <li>
                                    <b>人事关系地点</b>
                                    <span>总部</span>
                                </li>
                                <li>
                                    <b>办公地点</b>
                                    <span>北京昌平厂</span>
                                </li>
                                <li>
                                    <b>所属党组织</b>
                                    <span>**党委**党支部</span>
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
                                <li>
                                    <b>敏感岗位属性</b>
                                    <span>质量、采购、财务、品牌</span>
                                </li>
                                <li>
                                    <b>所需系统</b>
                                    <span>人力</span>
                                </li>
                                <li>
                                    <b>现岗位任职时间</b>
                                    <span>1年2个月</span>
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
                                <li>
                                    <b>主岗位、非主岗</b>
                                    <span>主岗位</span>
                                </li>
                                <li>
                                    <b>干部兼职情况</b>
                                    <span>内部兼职</span>
                                </li>
                                <li>
                                    <b>现岗位任命时间</b>
                                    <span>2021年1月12日</span>
                                </li>
                            </ul>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="工作经历" name="third">
                        <div class="message">
                            <el-table :data="workExper">
                                <el-table-column prop="num" label="序号"></el-table-column>
                                <el-table-column prop="time" label="时间"></el-table-column>
                                <el-table-column prop="unit" label="单位"></el-table-column>
                                <el-table-column prop="dept" label="部门"></el-table-column>
                                <el-table-column prop="position" label="职位"></el-table-column>
                                <el-table-column prop="system" label="所属系统"></el-table-column>
                            </el-table>
                            <!-- <ul class="left">
                                <li>2001年到2004年 就职于时代事业部</li>
                                <li>2004年到2021年 就职于普罗科事业部</li>
                            </ul> -->
                            <!-- <ul class="right">
                <li>
                  <b>来福田后工作经历</b>
                </li>
              </ul> -->
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="个人绩效" name="fourth">
                        <div class="jixiao">
                            <el-form :model="messageForm" :inline="true">
                                <el-form-item label="出生日期" prop="birthday">
                                    <el-date-picker
                                        style="width: 220px"
                                        v-model="messageForm.birthday"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-form>
                            <table border="1" width="auto" height="300" cellspacing="0" align="center">
                                <!-- colspan="2" -->

                                <tr>
                                    <td>绩效周期</td>
                                    <td>绩效类型</td>
                                    <td colspan="12">绩效结果</td>
                                </tr>
                                <tr>
                                    <td rowspan="6">2020年</td>
                                    <td colspan="2" rowspan="2">月度绩效</td>

                                    <td>1月</td>
                                    <td>2月</td>
                                    <td>3月</td>
                                    <td>4月</td>
                                    <td>5月</td>
                                    <td>7月</td>

                                    <td>8月</td>
                                    <td>9月</td>
                                    <td>10月</td>

                                    <td>11月</td>
                                    <td>12月</td>
                                    <!--rowspan 合并列-->
                                </tr>
                                <tr>
                                    <td>A(80%)</td>
                                    <td>A(80%)</td>
                                    <td>A(80%)</td>

                                    <td>A(80%)</td>
                                    <td>A(80%)</td>
                                    <td>A(80%)</td>

                                    <td>A(80%)</td>
                                    <td>A(80%)</td>
                                    <td>A(80%)</td>

                                    <td>A(80%)</td>
                                    <td>A(80%)</td>
                                </tr>
                                <tr>
                                    <!--colspan 合并行-->

                                    <td colspan="2" rowspan="2">季度绩效</td>
                                    <td colspan="3">一季度</td>

                                    <td colspan="3">二季度</td>

                                    <td colspan="3">三季度</td>

                                    <td colspan="3">四季度</td>
                                </tr>
                                <tr>
                                    <td>A(80%)</td>
                                    <td colspan="3">A(80%)</td>
                                    <!-- rowspan="2" -->

                                    <td colspan="3">A(80%)</td>

                                    <td colspan="3">A(80%)</td>

                                    <td colspan="3">A(80%)</td>

                                    <!--rowspan 合并列-->
                                </tr>
                                <tr>
                                    <td colspan="2" rowspan="2">年度绩效</td>
                                    <td colspan="11">2020年度</td>
                                </tr>
                                <tr>
                                    <td colspan="11">A(80%)</td>
                                </tr>
                            </table>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="历次考评" name="five">
                        <div class="check">
                            <el-form :model="messageForm" :inline="true">
                                <el-form-item label="考评类型" prop="type">
                                    <el-select v-model="messageForm.type" placeholder="请选择">
                                        <el-option key="bbk" label="日常考评" value="bbk"></el-option>
                                        <el-option key="xtc" label="年度考评" value="xtc"></el-option>
                                        <el-option key="imoo" label="党委考评" value="imoo"></el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="考评周期" prop="period">
                                    <el-date-picker
                                        style="width: 220px"
                                        v-model="messageForm.period"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                    >
                                    </el-date-picker>
                                </el-form-item>
                            </el-form>
                            <div class="check-content">
                                <el-table :data="historyData">
                                    <el-table-column prop="type" label="考评类型"></el-table-column>
                                    <el-table-column prop="name" label="考评名称"></el-table-column>
                                    <el-table-column prop="period" label="考评周期"></el-table-column>
                                    <el-table-column prop="time" label="考评完成时间"></el-table-column>
                                    <el-table-column prop="result" label="考评结果"></el-table-column>
                                    <el-table-column prop="note" label="备注">可编辑</el-table-column>
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
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="社会关系及主要家庭成员" name="six">
                        <el-table :data="familyData">
                            <el-table-column prop="title" label="称谓">
                                <template>
                                    <el-select v-model="familyTitle">
                                        <el-option key="6" label="父亲" value="6"></el-option>
                                        <el-option key="7" label="母亲" value="7"></el-option>
                                        <el-option key="1" label="配偶" value="1"></el-option>
                                        <el-option key="2" label="父女" value="2"></el-option>
                                        <el-option key="3" label="父子" value="3"></el-option>
                                        <el-option key="4" label="母女" value="4"></el-option>
                                        <el-option key="5" label="母子" value="5"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <el-table-column prop="sex" label="性别"></el-table-column>
                            <el-table-column prop="age" label="年龄"></el-table-column>
                            <el-table-column prop="nation" label="民族"></el-table-column>
                            <el-table-column prop="brithday" label="出生日期"></el-table-column>
                            <el-table-column prop="politics" label="政治面貌">
                                <template>
                                    <el-select v-model="politicsTitle">
                                        <el-option key="4" label="党员" value="4"></el-option>
                                        <el-option key="5" label="预备党员" value="5"></el-option>
                                        <el-option key="1" label="团员" value="1"></el-option>
                                        <el-option key="2" label="群众" value="2"></el-option>
                                        <el-option key="3" label="其他" value="3"></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="unit" label="工作单位及职务"></el-table-column>

                            <el-table-column prop="address" label="现居住地址"></el-table-column>
                            <el-table-column prop="note" label="备注"></el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="兼职情况" name="seven">
                        <div class="">
                            <el-form v-model="messageForm">
                                <el-form-item label="兼职类型" prop="dutyType">
                                    <el-select v-model="messageForm.dutyType" placeholder="请选择" @change="handleChange">
                                        <el-option key="0" label="全部" value="0"></el-option>
                                        <el-option key="1" label="董监事兼职" value="1"></el-option>
                                        <el-option key="2" label="外部兼职" value="2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <!-- <p>报告人董监事兼职情况</p> -->
                            <el-table :data="partData" v-if="partFlag">
                                <el-table-column prop="name" label="兼职类型"></el-table-column>
                                <el-table-column prop="partName" label="兼职企业名称及兼职职务"></el-table-column>
                                <el-table-column prop="partTime" label="兼职时间"></el-table-column>
                                <el-table-column prop="money" label="兼职薪酬情况（金额）"></el-table-column>
                                <el-table-column prop="note" label="备注"></el-table-column>
                            </el-table>
                            <!-- <p>报告人外部兼职情况</p> -->
                            <el-table :data="externalData" v-if="externalFlag">
                                <el-table-column prop="name" label="兼职类型"></el-table-column>
                                <el-table-column prop="partName" label="兼职企业名称及兼职职务"></el-table-column>

                                <el-table-column prop="unit" label="上级主管单位"></el-table-column>
                                <el-table-column prop="partTime" label="兼职时间"></el-table-column>

                                <el-table-column prop="nums" label="兼职届数"></el-table-column>
                                <el-table-column prop="money" label="兼职薪酬情况（金额）"></el-table-column>
                                <el-table-column prop="note" label="备注"></el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
        </div>
        <div>
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
    </div>
</template>

<script>
export default {
    name: 'change',
    data() {
        return {
            adjustForm: {
                name: '', //姓名
                later: '', //调整之后
                before: '', //调整之前
                condition: '', //情况
                reason: '', //原因
                among: '', //其中
                workShiftReason: '', //轮岗原因
                workShiftType: '', //轮岗形式
                time: '' //日期
            },
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
            },
            tableData: [
                {
                    unit: 'xx事业部',
                    name: '张三',
                    sex: '男',
                    duty: '经理',
                    rank: 'L2',
                    age: '21',
                    credentials: '本科',
                    birthday: '1897年6月21日',
                    politicsStatus: '群众',
                    time: '2021年6月21日'
                }
            ],
            //家庭关系
            familyData: [
                {
                    title: '父亲',
                    name: '张三',
                    age: '41',
                    brithday: '1918年8月12日',
                    politics: '党员',
                    unit: '沙河镇',
                    sex: '男',
                    nation: '汉族',
                    address: '北京市昌平区沙河镇',
                    note: ''
                }
            ],
            familyTitle: '',
            politicsTitle: '',
            //工作经历
            workExper: [
                {
                    num: 1,
                    time: '2021年6月30日',
                    unit: 'xx事业部',
                    dept: '信息技术部',
                    position: '任xxx高级经理',
                    system: ''
                }
            ],
            //历史考评
            historyData: [
                {
                    type: '日常考评',
                    name: '招聘试用期考评',
                    period: '2002-01~2002-04',
                    time: '2021年6月30日11:09:15',
                    result: '优秀/良好/合格/有差距',
                    note: ''
                },
                {
                    type: '年度考评',
                    name: '2021年度考评',
                    period: '2020-01~2021-01',
                    time: '2021年6月30日',
                    result: '',
                    note: '优秀/良好/合格/有差距'
                },
                {
                    type: '党委 考评',
                    name: '党组织书记抓基层党建述职评议 ',
                    period: '',
                    time: '2021.1.13',
                    result: '优秀/良好/合格/有差距',
                    note: ''
                }
            ],
            //个人绩效
            perforData: [],
            //社会兼职情况
            partData: [
                {
                    name: '董监事兼职',
                    partTime: '经理',
                    partName: '1个月',
                    money: '1000',
                    note: ''
                }
            ],
            //报告人外部兼职情况
            externalData: [
                {
                    name: '外部兼职',
                    partTime: '2021年6月30日',
                    partName: '经理',
                    money: '1000',
                    note: '',
                    unit: 'xx事业部',
                    nums: '1'
                }
            ],
            partFlag: true,
            externalFlag: true,
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
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
.change_search {
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
