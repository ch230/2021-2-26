import API from "@/api/index";
import axios from "axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      //餐饮
      active: 0,
      startValue: "",
      startPicker: false,
      endValue: "",
      endPicker: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate1: new Date(),
      currentDate2: new Date(),

      //日历
      nowDate: new Date().getDate(), //获取日期
      nowYear: new Date().getFullYear(), //获取年份
      nowMonth: new Date().getMonth() + 1, //获取月份
      signDate: [], //从后台获取签到日期
      html: "", //代码块

      //welink-code
      welink_code: "",
      username: "",
      token: "",
      employeeNumber: "",
      //餐饮列表点击更多
      historyList1: [],
      //页数
      startPage: 1,
      //总页数
      pageTotal: 1,
      //列表总条数
      totalComment: "",
      //上班按钮标识
      flag: true,
      //下班按钮标识
      offFlag: true,
      //员工编号
      piid: "",
      //餐饮列表
      listInfo: [],
      //条数
      paramsQuery: {
        size: 5
      },

      //打卡  参数
      //员工id
      userId: "",
      //经纬度
      longitude: "",
      latitude: "",
      //打卡时间
      tradedt: "",

      //打卡记录列表
      historyClockList: null,
      //时间参数
      monthTradedt: null,
      //初次打卡记录内容
      first: null,
      //末次打卡记录内容
      end: null,
      //鉴权参数
      noncestr: "",
      signature: "",
      timestamp: "",
      historyFlag: false,
      clockInFlag: false,
      nowDay1: { target: { innerText: new Date().getDate() } },
      nowDay:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() * 1 + 1 * 1) +
        "-" +
        new Date().getDate() +
        "  " +
        "00:00:00",
      buttonFlagTwo: false,
      commentDate: "",
      historyListFlag: false,
      firstFlag: "",
      lastFlag: "",
      clickDate: "" //当前点击的年月日
    };
  },
  created() {
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });
    //获取code
    this.getCode();
    //获取日历
    this.getTime();
    //打卡按钮
    // this.clockInFlag = true;
    var date1 = this.generateTimeReqestNumber();
    this.monthTradedt = date1.replace(
      /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
      "$1-$2-$3 $4:$5:$6"
    );
    var timer = setInterval(() => {
      if (this.token && this.piid) {
        this.getList();
        this.getAllClockList(this.monthTradedt);
        // this.getClockList(this.nowDay);
        //点击当前事件考勤事件
        this.addComment(this.nowDay1);
        clearInterval(timer);
      }
    }, 300);
  },
  watch: {
    //同一天
    clickDate(date) {
      if (date == this.nowDay.split(" ")[0]) {
        this.clockInFlag = true;
        if (this.historyClockList) {
          this.historyListFlag = true;
        } else {
          this.historyListFlag = false;
        }
      } else {
        this.clockInFlag = false;
        this.historyListFlag = false;
      }
      this.getClockList(this.nowDay);
    },
    //同一月
    nowMonth() {
      this.clickbtn();
    }
  },
  methods: {
    formatStatus(n) {
      if (n == 1) {
        return "正常";
      } else if (n == 2) {
        return "迟到";
      } else if (n == 3) {
        return "早退";
      } else if (n == 4) {
        return "未打卡";
      }
    },

    /*时间判断*/
    isLeap(year) {
      return year % 4 == 0
        ? year % 100 != 0
          ? 1
          : year % 400 == 0
          ? 1
          : 0
        : 0;
    },
    clickbtn() {
      if (this.nowMonth == new Date().getMonth() + 1 * 1) {
        this.getClockList(this.nowDay);
        this.clockInFlag = true;
        this.historyListFlag = true;
      } else {
        this.historyListFlag = false;
        this.clockInFlag = false;
      }
    },
    /*点击上一月*/
    lastMonth() {
      // this.historyListFlag = false;
      // this.buttonFlagTwo = false;
      if (this.nowMonth == 1) {
        this.nowYear = parseInt(this.nowYear) - 1;
        this.nowMonth = 12;
        let date =
          this.nowYear +
          "-" +
          this.pad2(this.nowMonth) +
          "-" +
          "12" +
          " " +
          "00:00:00";
        this.getAllClockList(date);

        return;
      }
      this.nowMonth = parseInt(this.nowMonth) - 1;

      let date =
        this.nowYear +
        "-" +
        this.pad2(this.nowMonth) +
        "-" +
        "12" +
        " " +
        "00:00:00";
      this.getAllClockList(date);
    },
    /*点击下一月*/
    nextMonth() {
      // this.buttonFlagTwo = false;
      // this.historyListFlag = false;
      if (this.nowMonth == 12) {
        this.nowYear = parseInt(this.nowYear) + 1;
        this.nowMonth = 1;
        let date =
          this.nowYear + "-" + this.nowMonth + "-" + "12" + " " + "00:00:00";
        this.getAllClockList(date);

        return;
      }

      this.nowMonth = parseInt(this.nowMonth) + 1;

      let date =
        this.nowYear +
        "-" +
        this.pad2(this.nowMonth) +
        "-" +
        "12" +
        "  " +
        "00:00:00";
      this.getAllClockList(date);
    },
    /*点击当前事件考勤事件*/
    addComment: function(event) {
      this.commentDate = event.target.innerText;
      if (
        this.commentDate == "六" ||
        this.commentDate == "日" ||
        this.commentDate == "一" ||
        this.commentDate == "二" ||
        this.commentDate == "三" ||
        this.commentDate == "四" ||
        this.commentDate == "五"
      ) {
        return false;
      } else {
        //点击日期获取的时间
        var old =
          this.nowYear +
          "-" +
          this.pad2(this.nowMonth) +
          "-" +
          this.pad2(this.commentDate);
        this.clickDate = old;
        //点击日期时的当前时间
        // var newDate =
        //   new Date().getFullYear() +
        //   "-" +
        //   this.pad2(new Date().getMonth() + 1) +
        //   "-" +
        //   this.pad2(new Date().getDate());
        //判断签到按钮是否存在
        // if (old != newDate) {
        //   this.clockInFlag = false;
        // } else {
        //   this.clockInFlag = true;
        // }
        // var date = old + "  " + "00:00:00";
        //获取签到天数的方法
        // this.getClockList(date);
      }
    },
    /*日历方法*/
    getTime() {
      //获取当前时间
      var days_per_month = new Array(
        31,
        28 + this.isLeap(this.nowYear),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ); //每个月的天数
      var dateHtml =
        "<li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li>"; //日历头部
      var s = new Date(
        this.nowYear + "/" + this.nowMonth + "/" + "01"
      ).getDay(); //获取本月的一号是星期几 0星期天

      if (s > 0);
      for (var i = s - 1; i >= 0; i--) {
        // var s=days_per_month[this.nowMonth - 1];//获取当前月份的最大天数 最后一天
        var year = parseInt(this.nowMonth) - 1; //获取当前月份
        if (year == 0) {
          year = 12;
        }
        //alert(s+"--"+parseInt(days_per_month[year-1])+"--"+i); //days_per_month[year-1] 获取上个月的天数
        var maxnowMonth = parseInt(days_per_month[year - 1]) - i;
        dateHtml += "<li style='color: #9e9898'>" + maxnowMonth + "</li>"; //获取上月末尾天数  补齐本月日历显示
      }
      /*循坏输出 日历访日 html中*/
      for (var j = 0; j < days_per_month[this.nowMonth - 1]; j++) {
        var dateHtmlp = "";

        var date = `${this.nowYear}-${this.nowMonth}-${j + 1}`; //当前天
        var _v = j + 1 <= 9 ? "0" + (j + 1) : j + 1;
        var nowMonth = this.nowMonth <= 9 ? "0" + this.nowMonth : this.nowMonth;
        if (this.signDate.length >= 1) {
          //有签到历史
          var is_date = false;
          for (var n = 0; n < this.signDate.length; n++) {
            // 判断日历循环的天数跟选择的打卡天数
            if (`${this.nowYear}-${nowMonth}-${_v}` == this.signDate[n].days) {
              //判断前天数和 签到天数相同 进入 写css区分
              is_date = this.signDate[n].status;
            }
          }
          //状态为1  打卡成功
          if (is_date == 1) {
            dateHtmlp = `<span class='succe'>` + (j + 1) + "</span>";
          }
          //状态为2,3,4,5 打卡异常
          else if (
            is_date == 2 ||
            is_date == 3 ||
            is_date == 4 ||
            is_date == 5
          ) {
            dateHtmlp = `<span class='error'>` + (j + 1) + "</span>";
          }
          //状态为6 周末
          else if (is_date == 6) {
            dateHtmlp = "<span>" + (j + 1) + "</span>";
          } else {
            // 当前天跟循环的时间相比 大于的话就是当前天大  否则就是以往天 比如明天
            if (new Date() > new Date(date)) {
              dateHtmlp = '<span class="failed">' + (j + 1) + "</span>";
            } else {
              dateHtmlp = "<span>" + (j + 1) + "</span>";
            }
          }
        } else {
          // 当前天跟循环的时间相比 大于的话就是当前天大  否则就是以往天 比如明天
          if (new Date() > new Date(date)) {
            dateHtmlp = '<span class="failed">' + (j + 1) + "</span>";
          } else {
            dateHtmlp = "<span>" + (j + 1) + "</span>";
          }
        }
        dateHtml += "<li>" + dateHtmlp + "</li>";
      }
      this.html = dateHtml;
    },
    //获取code
    getCode() {
      var that = this;
      //获取code
      that.$loading.show("加载中");
      window.HWH5.getAuthCode()
        .then(data => {
          that.welink_code = data.code;
          //用户免登录地址
          var login_url =
            API.getUserNameByCode +
            "?code=" +
            that.welink_code +
            "&name=" +
            encodeURIComponent("一卡通");

          axios
            .post(login_url)
            .then(response => {
              that.$loading.hide();
              if (response.data.code == 200) {
                let info = response.data.data;
                that.token = info.access_token;
                that.username = info.user.username;
                that.employeeNumber = info.user.employeeNumber;
                that.userId = info.user.id;
                that.getTarget();
                that.getPiid();
              }
            })
            .catch(function(error) {
              Toast.fail(error);
            });
        })
        .catch(error => {
          Toast.fail("获取code异常:" + error);
        });
    },
    //一卡通根据员工编号获取个人信息 获取piidId
    getPiid() {
      let emp_url =
        API.getInfoByEmployeeNumber +
        "?employeeNumber=" +
        this.employeeNumber +
        "&access_token=" +
        this.token;
      this.$loading.show("加载中");
      axios
        .post(emp_url)
        .then(response => {
          this.$loading.hide();
          if (response.data.code == 200) {
            this.piid = response.data.data.piid;
          }
        })
        .catch(function(error) {
          Toast.fail("根据员工编号获取个人信息异常:" + error);
        });
    },
    //获取鉴权信息welink
    getTarget() {
      let target_url =
        API.getTargetUrl +
        "?access_token=" +
        this.token +
        "&name=" +
        encodeURIComponent("一卡通") +
        "&targetUrl=" +
        window.location.href;
      this.$loading.show("加载中");
      axios
        .post(target_url)
        .then(response => {
          this.$loading.hide();
          let info = response.data.data;
          if (info) {
            this.timestamp = info.timeStamp; //时间戳
            this.noncestr = info.nonceStr.toLocaleLowerCase();
            this.signature = info.signature.toLocaleLowerCase();
            this.getAuthentication();
          }
        })
        .catch(function(error) {
          Toast.fail("获取鉴权信息异常:" + error);
        });
    },
    //鉴权 welink-jsapi
    getAuthentication() {
      let that = this;
      window.HWH5.config({
        appId: "20201208145823671229510", // 应用的client_id
        timestamp: that.timestamp, // 与生成签名一致的时间戳，精确到秒十位
        noncestr: that.noncestr, // 服务端使用的随机串，要处理成小写字符
        signature: that.signature, // 签名信息，要处理成小写字符
        jsApiList: ["getLocation"]
      });

      /* 如果鉴权成功，会执行ready方法，把需要在页面加载时调用的相关接口放在ready中确保执行。
         需要用户触发时才调用的接口，则直接调用，不需要放在ready函数中。*/
      window.HWH5.ready(() => {
        that.getLocal();
      });

      // 如果鉴权失败，则调用error方法
      window.HWH5.error(err => {
        Toast.fail("鉴权失败" + err);
      });
    },
    //获取经纬度
    getLocal() {
      this.$loading.show("加载中");
      window.HWH5.getLocation({ type: 0 })
        .then(data => {
          this.$loading.hide();
          this.latitude = data.latitude;
          this.longitude = data.longitude;
        })
        .catch(error => {
          Toast.fail("获取位置信息异常:" + error);
        });
    },

    //打卡
    handleClockIn(flagClock) {
      var that = this;
      if (that.piid) {
        that.$loading.show("加载中");
        var save_url = API.save + "?access_token=" + that.token;
        axios
          .post(save_url, {
            piid: that.piid,
            userId: that.userId,
            lat: that.latitude,
            lng: that.longitude
          })
          .then(response => {
            that.$loading.hide();
            if (response.data.code == 200) {
              //打卡记录
              that.getClockList(that.nowDay);
              //月份打卡记录
              that.getAllClockList(that.monthTradedt);
              //重新获取日历
              that.getTime();
              //打卡成功提示
              Toast("打卡成功");
              //按钮隐藏判断条件
              if (flagClock == "flag") {
                that.flag = false;
              } else {
                that.offFlag = false;
              }
            } else {
              Toast.fail(response.data.message);
            }
          })
          .catch(function(error) {
            Toast.fail(error);
          });
      } else {
        return;
      }
    },
    //打卡记录列表
    getClockList(tradedt) {
      let that = this;
      if (that.piid && that.commentDate.length <= 2) {
        var list_url =
          API.clockList +
          "?access_token=" +
          that.token +
          "&tradedt=" +
          encodeURIComponent(tradedt) +
          "&piid=" +
          that.piid +
          "&current=" +
          that.startPage +
          "&size=" +
          300;
        that.$loading.show("加载中");
        axios
          .get(list_url)
          .then(response => {
            that.$loading.hide();

            if (response.data.data && response.data.data.last) {
              let data = response.data.data;
              //打卡记录存在----打卡历史记录显示
              // that.historyListFlag = true;
              that.historyClockList = data;
              //末次打卡记录存在
              if (that.historyClockList.last.date) {
                //首次历史记录
                that.first = that.historyClockList.first.date;
                //末次打卡记录
                that.end = that.historyClockList.last.date;
                //上班签到不显示
                that.flag = false;
                //下班签到不显示
                that.offFlag = false;
                //首次打卡记录
                that.firstFlag = that.historyClockList.first.status;
                //末次打卡记录
                that.lastFlag = that.historyClockList.last.status;
                that.buttonFlagTwo = true;
              } else {
                //首次记录
                that.first = that.historyClockList.first.date;
                //末次记录
                that.end = "";
                //flag不显示
                that.flag = false;
                //下班显示
                that.offFlag = true;
                //首次打卡记录
                that.firstFlag = that.historyClockList.first.status;
                //末次打卡记录
                that.lastFlag = that.historyClockList.last.status;
                that.buttonFlagTwo = false;
              }
              that.$forceUpdate();
            } else {
              that.buttonFlagTwo = false;
            }
          })
          .catch(function(error) {
            that.$loading.hide();
            Toast.fail(error);
          });
      } else {
        return false;
      }
    },
    //上班
    handleButy() {
      var date1 = this.generateTimeReqestNumber();
      var shangban = date1.replace(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
        "$1-$2-$3 $4:$5:$6"
      );

      if (new Date(shangban) != new Date(this.monthTradedt)) {
        this.getLocal();
      }
      this.handleClockIn("flag");
      this.getTime();
    },
    //下班
    handleOffButy() {
      var date1 = this.generateTimeReqestNumber();
      var xiaban = date1.replace(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
        "$1-$2-$3 $4:$5:$6"
      );
      if (new Date(xiaban) != new Date(this.monthTradedt)) {
        this.getLocal();
      }
      this.handleClockIn("offFlag");
      this.getTime();
    },
    //获取打卡记录按月份
    getAllClockList(tradedt) {
      var that = this;
      if (that.piid) {
        var allList_url =
          API.allList +
          "?access_token=" +
          that.token +
          "&tradedt=" +
          encodeURIComponent(tradedt) +
          "&piid=" +
          that.piid;
        that.$loading.show("加载中");
        axios
          .get(allList_url)
          .then(response => {
            that.$loading.hide();
            if (response.data.data) {
              that.signDate = response.data.data;
              that.$forceUpdate();
            }
            that.getTime();
          })
          .catch(function(error) {
            Toast.fail(error);
          });
      }
    },
    //更新打卡记录
    handleAgin() {
      var date1 = this.generateTimeReqestNumber();
      var aginTime = date1.replace(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
        "$1-$2-$3 $4:$5:$6"
      );
      if (new Date(aginTime) != new Date(this.monthTradedt)) {
        this.getLocal();
      }
      this.handleClockIn("offFlag");
    },
    //补零
    pad2(n) {
      return n < 10 ? "0" + n : n;
    },
    //获取当前时间 年月日时分秒
    generateTimeReqestNumber() {
      var date = new Date();
      return (
        date.getFullYear().toString() +
        this.pad2(date.getMonth() + 1) +
        this.pad2(date.getDate()) +
        this.pad2(date.getHours()) +
        this.pad2(date.getMinutes()) +
        this.pad2(date.getSeconds())
      );
    },
    //初始化数据---餐饮
    getList() {
      let startPage = this.startPage;
      let that = this;
      var list_url =
        API.list +
        "?piid=" +
        that.piid +
        "&startTimeStr=" +
        that.startValue +
        "&endTimeStr=" +
        that.endValue +
        "&access_token=" +
        that.token +
        "&current=" +
        startPage +
        "&size=" +
        that.paramsQuery.size;
      that.$loading.show("加载中");
      axios
        .get(list_url)
        .then(response => {
          that.$loading.hide();
          if (response.data.data.records) {
            that.historyFlag = true;
            let info = response.data.data;
            that.listInfo = info.records;
            that.pageTotal = info.pages;
            that.totalComment = info.total;
          } else {
            that.historyFlag = false;
          }
        })
        .catch(function(error) {
          Toast.fail(error);
        });
    },
    //更多
    handleMore() {
      let that = this;
      if (this.startPage < this.pageTotal) {
        this.startPage++;
        let startPage = this.startPage;
        var list_url =
          API.list +
          "?piid=" +
          that.piid +
          "&startTimeStr=" +
          that.startValue +
          "&endTimeStr=" +
          that.endValue +
          "&access_token=" +
          that.token +
          "&current=" +
          startPage +
          "&size=" +
          that.paramsQuery.size;
        that.$loading.show("加载中");
        axios
          .get(list_url)
          .then(response => {
            that.$loading.hide();
            if (response.data.code == 200) {
              that.historyList1 = response.data.data.records;
              that.pageTotal = response.data.data.pages;
              that.totalComment = response.data.data.total;
              that.listInfo = that.listInfo.concat(that.historyList1);
            }
          })
          .catch(function(error) {
            Toast.fail(error);
          });
      } else if (this.startPage == this.pageTotal) {
        Toast.fail("没有更多数据!");
      }
    },
    //员工餐饮消费明细
    handleSearch() {
      let that = this;
      let startPage = that.startPage;
      if (that.startValue != "" && that.endValue != "") {
        if (new Date(that.startValue) <= new Date(that.endValue)) {
          var list_url =
            API.list +
            "?piid=" +
            that.piid +
            "&startTimeStr=" +
            that.startValue +
            "&endTimeStr=" +
            that.endValue +
            "&access_token=" +
            that.token +
            "&current=" +
            startPage +
            "&size=" +
            that.paramsQuery.size;
          that.$loading.show("加载中");
          axios
            .get(list_url)
            .then(response => {
              that.$loading.hide();
              if (response.data.code == 200) {
                that.listInfo = response.data.data.records;
                that.pageTotal = response.data.data.pages;
                that.totalComment = response.data.data.total;
              }
            })
            .catch(function(error) {
              Toast.fail(error);
            });
        } else {
          Toast.fail("请选择正确时间");
        }
      } else {
        Toast.fail("请选择时间");
      }
    },
    //餐饮---开始时间--确认按钮
    onStartConfirm(value) {
      var d = new Date(value);
      var year = d.getFullYear(); //年
      var month = d.getMonth() + 1; //月
      var date = d.getDate();
      this.startValue = year + "-" + month + "-" + date;
      this.startPicker = false;
    },
    //餐饮---结束时间--确认按钮
    onEndConfirm(value) {
      var d = new Date(value);
      var year = d.getFullYear(); //年
      var month = d.getMonth() + 1; //月
      var date = d.getDate();
      this.endValue = year + "-" + month + "-" + date;
      this.endPicker = false;
    }
  }
};
