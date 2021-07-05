<template>
    <div class="wei_wrap">
        <div class="echarts_search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="图表类型" prop="chartType">
                    <el-select
                        v-model="ruleForm.chartType"
                        placeholder="请选择系统"
                        clearable
                        size="small"
                        style="width: 170px"
                        @change="handlechange"
                    >
                        <el-option v-for="dict in chartOption" :key="dict.chartValue" :label="dict.chartLabel" :value="dict.chartValue" />
                    </el-select>
                </el-form-item>
                <el-form-item label="所属系统" prop="system">
                    <el-select v-model="ruleForm.system" placeholder="请选择系统" clearable size="small" style="width: 170px">
                        <el-option v-for="dict in systemOption" :key="dict.systemValue" :label="dict.systemLabel" :value="dict.deptValue" />
                    </el-select>
                </el-form-item>
                <el-form-item label="部门" prop="dept">
                    <el-select v-model="ruleForm.dept" placeholder="请选择部门" clearable size="small" style="width: 170px">
                        <el-option v-for="dict in deptOption" :key="dict.deptValue" :label="dict.deptLabel" :value="dict.deptValue" />
                    </el-select>
                </el-form-item>
                <el-form-item label="职级" prop="rank">
                    <el-select v-model="ruleForm.rank" placeholder="请选择职级" clearable size="small" style="width: 170px">
                        <el-option v-for="dict in rankOption" :key="dict.rankValue" :label="dict.rankLabel" :value="dict.rankValue" />
                    </el-select>
                </el-form-item>

                <el-form-item label="工作类型" prop="workType">
                    <el-select v-model="ruleForm.workType" placeholder="请选择部门" clearable size="small" style="width: 170px">
                        <el-option v-for="dict in workOption" :key="dict.deptValue" :label="dict.workLabel" :value="dict.deptValue" />
                    </el-select>
                </el-form-item>
                <el-form-item label="年龄" prop="rank">
                    <el-select v-model="ruleForm.rank" placeholder="请选择职级" clearable size="small" style="width: 170px">
                        <el-option v-for="dict in rankOption" :key="dict.rankValue" :label="dict.rankLabel" :value="dict.rankValue" />
                    </el-select>
                </el-form-item>
                <el-form-item label="多系统经历" prop="experience">
                    <el-select v-model="ruleForm.experience" placeholder="请选择部门" clearable size="small" style="width: 170px">
                        <el-option
                            v-for="dict in experienceOption"
                            :key="dict.experienceValue"
                            :label="dict.experienceLabel"
                            :value="dict.experienceValue"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="年代" prop="decade">
                    <el-select v-model="ruleForm.decade" placeholder="请选择系统" clearable size="small" style="width: 170px">
                        <el-option
                            v-for="dict in decadeOption"
                            :key="dict.decadeValue"
                            :label="dict.decadeLabel"
                            :value="dict.decadeValue"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="decade">
                    <el-date-picker
                        style="width: 220px"
                        v-model="ruleForm.decade"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" size="small">搜索</el-button>
                    <el-button type="warning" size="small">导出</el-button>
                    <el-button type="success" size="small">打印</el-button>
                </el-form-item>
            </el-form>
        </div>

        <b id="one"></b>
        <b id="two"></b>
        <b id="three"></b>
        <b id="my_barChart"></b>

        <b id="four"></b>
        <b id="five"></b>
        <b id="six"></b>
        <b id="seven"></b>

        <b id="nine"></b>
        <b id="ten"></b>

        <b id="eleven"></b>
        <b id="twelve"></b>

        <b id="thirteen "></b>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
export default {
    name: 'dimensional',
    data() {
        return {
            ruleForm: {
                chartType: '', //图表类型
                system: '',
                dept: '',
                rank: '',
                workType: '',
                experience: '',
                time: '',
                decade: '' //年代
            },
            //图表类型
            chartOption: [
                { chartValue: '1', chartLabel: '党政干部' },
                { chartValue: '2', chartLabel: '职级分析' },
                { chartValue: '3', chartLabel: '年龄范围' },
                { chartValue: '4', chartLabel: '性别' },
                { chartValue: '5', chartLabel: '第一学历' },

                { chartValue: '6', chartLabel: '最高学历' },
                { chartValue: '7', chartLabel: '政治面貌' },
                { chartValue: '8', chartLabel: '系统经历' },
                { chartValue: '9', chartLabel: '社会工龄/福田工龄' },

                { chartValue: '10', chartLabel: '干部流失情况' },
                { chartValue: '11', chartLabel: '进入公司渠道' },
                { chartValue: '12', chartLabel: '干部调整情况' },
                { chartValue: '13', chartLabel: '总部，事业部经历' }
            ],
            //所属系统
            systemOption: [
                { systemValue: '1', systemLabel: '研发' },
                { systemValue: '2', systemLabel: '制造' },
                { systemValue: '3', systemLabel: '营销' },
                { systemValue: '4', systemLabel: '采购' },
                { systemValue: '5', systemLabel: '质量' }
            ],
            //部门
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
                    deptLabel: '事业部'
                },
                {
                    deptValue: '5',
                    deptLabel: '总部'
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
            //职级
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
            //工作类型
            workOption: [
                {
                    workValue: '1',
                    workLabel: '兼职'
                }
            ],
            experienceOption: [
                {
                    experienceValue: '1',
                    experienceLabel: '单一'
                },
                {
                    experienceValue: '2',
                    experienceLabel: '两个'
                },
                {
                    experienceValue: '3',
                    experienceLabel: '三个及以上'
                }
            ],
            //年代
            decadeOption: [
                {
                    decadeValue: '1',
                    decadeLabel: '60后'
                },
                {
                    decadeValue: '2',
                    decadeLabel: '70后'
                },
                {
                    decadeValue: '3',
                    decadeLabel: '80后'
                },
                {
                    decadeValue: '4',
                    decadeLabel: '90后'
                },
                {
                    decadeValue: '5',
                    decadeLabel: '00后'
                },
                {
                    decadeValue: '6',
                    decadeLabel: '10后'
                }
            ],
            option: {},
            oneoption: {},
            twoOption: {},
            threeOption: {},

            fouroption: {},
            fiveOption: {},
            sixOption: {},

            sevenoption: {},
            nineOption: {},
            tenOption: {},

            elevenOption: {},
            twelveOption: {},
            thirteenOption: {}
        };
    },
    mounted() {
        this.get();
    },
    methods: {
        get() {
            echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);
            var one = document.getElementById('one');
            var three = document.getElementById('three');
            var two = document.getElementById('two');
            var chartDom = document.getElementById('my_barChart');

            var four = document.getElementById('four');
            var five = document.getElementById('five');
            var six = document.getElementById('six');
            var seven = document.getElementById('seven');

            var nine = document.getElementById('nine');
            var ten = document.getElementById('ten');

            var eleven = document.getElementById('eleven');
            var twelve = document.getElementById('twelve');
            var thirteen = document.getElementById('thirteen ');

            var myChart = echarts.init(chartDom);
            var oneChart = echarts.init(one);
            var threeChart = echarts.init(three);
            var twoChart = echarts.init(two);

            var fourChart = echarts.init(four);
            var fiveChart = echarts.init(five);
            var sixChart = echarts.init(six);
            var sevenChart = echarts.init(seven);

            var nineChart = echarts.init(nine);
            var tenChart = echarts.init(ten);

            var elevenChart = echarts.init(eleven);
            var twelveChart = echarts.init(twelve);
            var thirteenChart = echarts.init(thirteen);
            this.oneoption = {
                title: {
                    text: '党委干部/行政干部',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '行政干部' },
                            { value: 300, name: '党委干部' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.twoOption = {
                title: {
                    text: '职级分析',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 148, name: 'A' },
                            { value: 235, name: 'B' },
                            { value: 380, name: 'C' },
                            { value: 484, name: 'L1' },
                            { value: 500, name: 'L2' },
                            { value: 1048, name: 'L3.1' },
                            { value: 735, name: 'L3.2' },
                            { value: 580, name: 'L4.1' },
                            { value: 84, name: 'L4.2' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.threeOption = {
                title: {
                    text: '年龄范围',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '年龄范围25以下' },
                            { value: 735, name: '25~30' },
                            { value: 580, name: '35~40' },
                            { value: 484, name: '40~45' },
                            { value: 300, name: '45~50' },
                            { value: 230, name: '55以上' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.option = {
                title: {
                    text: '性别',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '男' },
                            { value: 735, name: '女' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            this.fouroption = {
                title: {
                    text: '政治面貌',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '群众' },
                            { value: 735, name: '党员' },
                            { value: 580, name: '预备党员' },
                            { value: 484, name: '团员' },
                            { value: 300, name: '其他' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.fiveOption = {
                title: {
                    text: '第一学历',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '博士' },
                            { value: 735, name: '硕士' },
                            { value: 580, name: '本科' },
                            { value: 484, name: '高中' },
                            { value: 300, name: '初中' },
                            { value: 100, name: '小学' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.sixOption = {
                title: {
                    text: '最高学历',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            // 小学、初中、中专/高中、专科、本科、研究生
                            { value: 1048, name: '研究生' },
                            { value: 735, name: '本科' },
                            { value: 580, name: '专科' },
                            { value: 484, name: '中专/高中' },
                            { value: 300, name: '初中' },
                            { value: 120, name: '小学' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.sevenoption = {
                title: {
                    text: '工作经历',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '40',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: '搜索引擎' },
                            { value: 735, name: '直接访问' },
                            { value: 580, name: '邮件营销' },
                            { value: 484, name: '联盟广告' },
                            { value: 300, name: '视频广告' }
                        ]
                    }
                ]
            };
            this.nineOption = {
                title: {
                    text: '社会工龄/福田工龄',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '1年' },
                            { value: 735, name: '2年' },
                            { value: 580, name: '3年' },
                            { value: 484, name: '4年' },
                            { value: 300, name: '5年以上' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.tenOption = {
                title: {
                    text: '干部流失情况',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '搜索引擎' },
                            { value: 735, name: '直接访问' },
                            { value: 580, name: '邮件营销' },
                            { value: 484, name: '联盟广告' },
                            { value: 300, name: '视频广告' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.elevenOption = {
                title: {
                    text: '进入公司渠道',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '社会招聘' },
                            { value: 735, name: '学生招聘' },
                            { value: 580, name: '重组' },
                            { value: 484, name: '技工招聘' },
                            { value: 300, name: '其他' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.twelveOption = {
                title: {
                    text: '干部调整情况',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '晋升' },
                            { value: 735, name: '降职' },
                            { value: 300, name: '跨单位调动（事业部调入调出）' },

                            { value: 580, name: '离职' },
                            { value: 484, name: '免聘' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            this.thirteenOption = {
                title: {
                    text: '总部。事业部经历',
                    subtext: '',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1048, name: '总部' },
                            { value: 484, name: '事业部' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(this.option);
            oneChart.setOption(this.oneoption);
            threeChart.setOption(this.threeOption);
            twoChart.setOption(this.twoOption);

            fourChart.setOption(this.fouroption);
            fiveChart.setOption(this.fiveOption);
            sixChart.setOption(this.sixOption);
            sevenChart.setOption(this.sevenoption);
            nineChart.setOption(this.nineOption);
            tenChart.setOption(this.tenOption);

            elevenChart.setOption(this.elevenOption);
            twelveChart.setOption(this.twelveOption);
            thirteenChart.setOption(this.thirteenOption);
        },
        handlechange(e) {
            console.log(e);
        }
    }
};
</script>

<style scoped>
.echarts {
    width: 100%;
    height: 100%;
}

b {
    display: inline-block;
    width: 400px;
    height: 400px;
    margin-left: 20px;
}
.echarts_search {
    margin-bottom: 20px;
    margin-left: 10px;
}
</style>
