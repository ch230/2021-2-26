import API from "@/api/index";
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "clock",
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
      //餐饮消费数据类别
      listcltype: "",
      //餐饮数据状态
      listStatus: "",
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
        this.pad2(new Date().getMonth() * 1 + 1 * 1) +
        "-" +
        this.pad2(new Date().getDate()) +
        "  " +
        "00:00:00",
      buttonFlagTwo: false,
      commentDate: "",
      historyListFlag: false,
      firstFlag: "",
      lastFlag: ""
    };
  },
  created() {
    //获取code
    this.getCode();
    //获取日历
    this.getTime();
    //打卡按钮
    this.clockInFlag = true;
    var date1 = this.generateTimeReqestNumber();
    this.monthTradedt = date1.replace(
      /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
      "$1-$2-$3 $4:$5:$6"
    );

    var timer = setInterval(() => {
      if (this.token && this.piid) {
        //获取打卡记录按月份
        this.getAllClockList(this.monthTradedt);
        //点击当前天
        this.addComment(this.nowDay1);
        //清空计时器
        clearInterval(timer);
      }
    }, 300);
  },
  methods: {
    //判断状态
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
    clickbtn(date) {
      //上一月 下一月
      //如果是当前月份年
      if (date.split(" ")[0] == this.nowDay.split(" ")[0]) {
        //打卡记录方法
        this.getClockList(this.nowDay);
        //上下班打卡
        this.clockInFlag = true;
        //第一条数据存在就显示，否则不显示
        if (this.first) {
          //打卡列表
          this.historyListFlag = true;
        } else {
          //打卡列表
          this.historyListFlag = false;
        }
        //更新签到是否显示
        if (this.historyClockList && this.historyClockList.last) {
          if (this.historyClockList.last.date) {
            this.buttonFlagTwo = true;
          } else {
            this.buttonFlagTwo = false;
          }
        }
      } else {
        this.buttonFlagTwo = false;
        this.historyListFlag = false;
        this.clockInFlag = false;
      }
    },
    /*点击上一月*/
    lastMonth() {
      if (this.nowMonth == 1) {
        this.nowYear = parseInt(this.nowYear) - 1;
        this.nowMonth = 12;
        let date =
          this.nowYear +
          "-" +
          this.pad2(this.nowMonth) +
          "-" +
          this.pad2(new Date().getDate()) +
          " " +
          "00:00:00";
        this.getAllClockList(date);
        this.clickbtn(date);
        return;
      }
      this.nowMonth = parseInt(this.nowMonth) - 1;

      let date =
        this.nowYear +
        "-" +
        this.pad2(this.nowMonth) +
        "-" +
        this.pad2(new Date().getDate()) +
        " " +
        "00:00:00";
      this.clickbtn(date);

      this.getAllClockList(date);
    },
    /*点击下一月*/
    nextMonth() {
      if (this.nowMonth == 12) {
        this.nowYear = parseInt(this.nowYear) + 1;
        this.nowMonth = 1;
        let date =
          this.nowYear +
          "-" +
          this.pad2(this.nowMonth) +
          "-" +
          this.pad2(new Date().getDate()) +
          " " +
          "00:00:00";
        this.getAllClockList(date);
        this.clickbtn(date);

        return;
      }

      this.nowMonth = parseInt(this.nowMonth) + 1;

      let date =
        this.nowYear +
        "-" +
        this.pad2(this.nowMonth) +
        "-" +
        this.pad2(new Date().getDate()) +
        "  " +
        "00:00:00";
      this.clickbtn(date);

      this.getAllClockList(date);
    },
    /*点击当前事件考勤事件*/
    addComment: function (event) {
      var that = this;
      that.commentDate = event.target.innerText;
      if (
        that.commentDate == "六" ||
        that.commentDate == "日" ||
        that.commentDate == "一" ||
        that.commentDate == "二" ||
        that.commentDate == "三" ||
        that.commentDate == "四" ||
        that.commentDate == "五"
      ) {
        return false;
      } else {
        //点击日期获取的时间
        var old =
          that.nowYear +
          "-" +
          that.pad2(that.nowMonth) +
          "-" +
          that.pad2(that.commentDate);
        //点击日期时的当前时间
        var newDate =
          new Date().getFullYear() +
          "-" +
          that.pad2(new Date().getMonth() + 1) +
          "-" +
          that.pad2(new Date().getDate());
        //判断签到按钮是否存在
        if (old != newDate) {
          that.clockInFlag = false;
          that.buttonFlagTwo = false;
        } else {
          that.clockInFlag = true;
          if (that.first) {
            that.flag = true;
            if (that.end) {
              that.offFlag = true;
              that.buttonFlagTwo = true;
            } else {
              that.offFlag = false;
              that.buttonFlagTwo = false;
            }
          }
        }
        var date = old + "  " + "00:00:00";
        //获取签到天数的方法
        that.getClockList(date);
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
        var yuanyuanclass = "";
        var nowDate1 =
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() * 1 + 1 * 1) +
          "-" +
          new Date().getDate();
        if (date == nowDate1) {
          yuanyuanclass = "yuanyuan";
        }
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
            dateHtmlp =
              `<span class='succe ${yuanyuanclass}'>` + (j + 1) + "</span>";
          }
          //状态为2,3,4,5 打卡异常
          else if (
            is_date == 2 ||
            is_date == 3 ||
            is_date == 4 ||
            is_date == 5
          ) {
            dateHtmlp =
              `<span class='error ${yuanyuanclass}'>` + (j + 1) + "</span>";
          }
          //状态为6 周末
          else if (is_date == 6) {
            dateHtmlp = `<span class='${yuanyuanclass}'>` + (j + 1) + "</span>";
          } else {
            // 当前天跟循环的时间相比 大于的话就是当前天大  否则就是以往天 比如明天
            if (new Date() > new Date(date)) {
              dateHtmlp =
                `<span class="failed ${yuanyuanclass}">` + (j + 1) + "</span>";
            } else {
              dateHtmlp =
                `<span class='${yuanyuanclass}'>` + (j + 1) + "</span>";
            }
          }
        } else {
          // 当前天跟循环的时间相比 大于的话就是当前天大  否则就是以往天 比如明天
          if (new Date() > new Date(date)) {
            dateHtmlp =
              `<span class="failed ${yuanyuanclass}">` + (j + 1) + "</span>";
          } else {
            dateHtmlp = `<span class='${yuanyuanclass}'>` + (j + 1) + "</span>";
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

                localStorage.setItem("token", info.access_token);
                localStorage.setItem("username", info.user.username);
                localStorage.setItem(
                  "employeeNumber",
                  info.user.employeeNumber
                );
                localStorage.setItem("userId", info.user.id);
                that.username = info.user.username;
                that.employeeNumber = info.user.employeeNumber;
                that.userId = info.user.id;
                that.getTarget();
                that.getPiid();
              }
            })
            .catch(function (error) {
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
            let info = response.data.data;
            localStorage.setItem("isAutoClock", info.isAutoClock); //是否自动打卡
            localStorage.setItem("clockAdmin", info.clockAdmin); //是否是管理员
            this.piid = response.data.data.user.piid;
          }
        })
        .catch(function (error) {
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
        .catch(function (error) {
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
              //点击当前天事件
              that.addComment(that.nowDay1);
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
          .catch(function (error) {
            Toast.fail(error);
          });
      }
    },
    //打卡记录列表
    getClockList(tradedt) {
      let that = this;
      if (that.piid) {
        var list_url =
          API.clockList +
          "?access_token=" +
          that.token +
          "&tradedt=" +
          encodeURIComponent(tradedt) +
          "&piid=" +
          that.piid +
          "&current=1&size=500";
        that.$loading.show("加载中");
        axios
          .get(list_url)
          .then(response => {
            that.$loading.hide();
            if (response.data.data) {
              if (response.data.data.last) {
                let data = response.data.data;
                //打卡记录存在----打卡历史记录显示
                that.historyListFlag = true;
                //点击当前天事件
                // that.historyClockList = [];
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
                  //是当前年月日--显示更新签到   不是当前年月日--不显示更新签到
                  let YMD = tradedt.split(" ")[0];
                  let nowTime = that.nowDay.split(" ")[0];
                  if (YMD != nowTime) {
                    that.buttonFlagTwo = false;
                  } else {
                    that.buttonFlagTwo = true;
                  }
                } else {
                  //更新签到按钮---不显示
                  that.buttonFlagTwo = false;
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
                }
                that.$forceUpdate();
              }
            } else {
              that.historyListFlag = false;
            }
          })
          .catch(function (error) {
            that.$loading.hide();
            return Promise.reject(error);
          });
      } else {
        return false;
      }
    },
    //上班
    handleButy() {
      this.getLocal();
      var ButyTime = setInterval(() => {
        if (this.latitude && this.longitude) {
          this.handleClockIn("flag");
          clearInterval(ButyTime);
        }
        this.getTime();
      }, 300);
    },
    //下班
    handleOffButy() {
      this.getLocal();
      var offTime = setInterval(() => {
        if (this.latitude && this.longitude) {
          this.handleClockIn("offFlag");
          clearInterval(offTime);
        }
        this.getTime();
      }, 300);
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
          .catch(function (error) {
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
      this.getTime();
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
    }   
  }
};
