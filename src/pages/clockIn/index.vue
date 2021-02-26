<template>
  <div class="clock">
    <div class="header">
      <van-tabs v-model="active">
        <van-tab title="上班打卡">
          <div class="clock_in_box">
            <!-- 日历 -->
            <div class="about">
              <div class="riqi">
                <div class="yd">
                  <a @click="lastMonth(1)">上一月</a>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {{ nowYear }}年{{ pad2(nowMonth) }}月 &nbsp;&nbsp;&nbsp;&nbsp;
                  <a @click="nextMonth(1)">下一月</a>
                </div>
                <ul
                  v-html="html"
                  @click="addComment($event)"
                  class="listUl"
                ></ul>
              </div>
            </div>
            <div class="content_clock">
              <!--打卡记录 -->

              <ul class="clock_list" v-if="historyListFlag">
                <li class="history_recode">
                  <span style="display:inline-block;margin-top:10px;">
                    打卡记录
                  </span>
                </li>
                <li class="history_list">
                  初次打卡:&nbsp;&nbsp;{{ first }}&nbsp;&nbsp;{{
                    formatStatus(firstFlag)
                  }}
                </li>
                <li class="history_list">
                  末次打卡:&nbsp;&nbsp;{{ end }}&nbsp;&nbsp;{{
                    formatStatus(lastFlag)
                  }}
                </li>
              </ul>
              <!-- <p v-else class="classnull">暂无打卡记录</p> -->
              <!-- 上下班按钮 -->
              <ul class="list_clock" v-if="clockInFlag">
                <li>
                  <p>
                    <span>上班</span>
                  </p>
                  <button @click="handleButy" v-if="flag">签到</button>
                  <p v-else style="margin-right: 4%; color: #999;">
                    已签到
                  </p>
                </li>
                <li>
                  <p>
                    <span>下班</span>
                  </p>
                  <button v-if="offFlag" @click="handleOffButy">签退</button>
                  <p v-else style="margin-right: 4%; color: #999">
                    已签到
                  </p>
                </li>
              </ul>
              <!-- 更新打卡记录 -->
              <div class="twoBtn">
                <button @click="handleAgin" v-if="buttonFlagTwo">
                  更新签到
                </button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="餐饮记录">
          <div class="food_wrap">
            <div style="background:#ffff;">
              <!-- 选择时间 -->
              <ul class="search">
                <li style="border-bottom:1px solid #eee;">
                  <van-field
                    readonly
                    clickable
                    name="datetimePicker"
                    :value="startValue"
                    label="开始时间"
                    placeholder="点击选择时间"
                    @click="startPicker = true"
                  />
                  <van-popup v-model="startPicker" position="bottom">
                    <van-datetime-picker
                      v-model="currentDate1"
                      type="date"
                      title="选择年月日"
                      :min-date="minDate"
                      :max-date="maxDate"
                      @confirm="onStartConfirm"
                      @cancel="startPicker = false"
                    />
                  </van-popup>
                </li>
                <li style="border-bottom:1px solid #eee;">
                  <van-field
                    readonly
                    clickable
                    name="datetimePicker"
                    :value="endValue"
                    label="结束时间"
                    placeholder="点击选择时间"
                    @click="endPicker = true"
                  />
                  <van-popup v-model="endPicker" position="bottom">
                    <van-datetime-picker
                      v-model="currentDate2"
                      type="date"
                      title="选择年月日"
                      :min-date="minDate"
                      :max-date="maxDate"
                      @confirm="onEndConfirm"
                      @cancel="endPicker = false"
                    />
                  </van-popup>
                </li>
              </ul>
              <!-- 搜索按钮 -->
              <div class="search_btn" style="font-size:14px;">
                <van-button type="primary" block @click="handleSearch"
                  >搜索</van-button
                >
              </div>
            </div>
            <!-- 餐饮历史记录 -->
            <div clang="history_list_food">
              <ul class="history" v-if="historyFlag">
                <p>历史记录</p>

                <li v-for="(item, index) in listInfo" :key="index">
                  {{ item.listStatus }}
                  {{ item.sccost / 100 }}元
                  <span>{{ item.scdt }}</span>
                </li>
              </ul>
              <div class="loader_btn" v-if="historyFlag">
                <button @click="handleMore">更多</button>
              </div>
              <p v-else class="title_none">暂无数据</p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export { default } from "./index";
</script>

<style lang="scss">
.clock {
  font-size: 14px;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  .header {
    height: 47px;
    width: 100%;
    .clock_in_box {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      .about {
        height: 100%;
        width: 100%;
        overflow: hidden;
        .riqi {
          width: 92%;
          margin: 10px 4%;
          height: 365px;
          background: #ffffff;
          margin-bottom: 10px;
          .yd {
            width: 92%;
            margin: 0 auto;
            text-align: center;
            padding-top: 15px;
            font-size: 15px;
            cursor: pointer;
            height: 35px;
            a {
              display: inline-block;
              // width: 0px;
              font-size: 14px;
              color: #333;
            }
          }
          ul {
            margin: 0 auto;
            width: 92%;
            height: 315px;
            overflow: hidden;
          }
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            float: left;
            position: relative;
            width: 14%;
            cursor: pointer;
            height: 40px;
            text-align: center;
            font-size: 14px;
            color: #000;
            margin: 5px 0;
            :hover {
              height: 40px;
              width: 40px;
              border-radius: 50%;
              background: #eee;
              color: #000;
              border: 1px solid #eee;
            }
            span {
              position: relative;
              width: 40px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              border-radius: 100%;
              i {
                position: absolute;
                top: 34px;
                left: -145px;
                background: rgb(255, 255, 2555);
                width: 168px;
                height: 72px;
                right: unset;
              }
              .active {
                border-radius: 50%;
                background: #3a8fea;
                color: #fff;
                width: 40px;
                height: 40px;
                margin: auto;
                display: flex;
                justify-content: center;
                align-items: center;
              }
            }

            span.succe {
              &::before {
                display: inline-block;
                position: absolute;
                bottom: 0px;
                left: 16px;
                content: "";
                width: 7px;
                height: 7px;
                border-radius: 50px;
                background-color: #007afe;
              }
            }
            span.error {
              &::before {
                display: inline-block;
                position: absolute;
                bottom: 0px;
                left: 16px;
                content: "";
                width: 7px;
                height: 7px;
                border-radius: 50px;
                background-color: rgb(219, 200, 14);
              }
            }
            span.failed {
              &::before {
                display: inline-block;
                position: absolute;
                bottom: 0px;
                left: 16px;
                content: "";
                width: 7px;
                height: 7px;
                border-radius: 50px;
                background-color: #f70606;
              }
            }
            span {
              &::before {
                display: inline-block;
                position: absolute;
                bottom: 0px;
                left: 16px;
                content: "";
                width: 7px;
                height: 7px;
                border-radius: 50px;
              }
            }
          }
        }
      }
      .content_clock {
        width: 92%;
        margin: auto;
        .list_clock {
          width: 100%;
          background: #ffffff;
          // margin-bottom: 320px;
          li {
            margin-left: 4%;
            // padding: 7px;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #eee;
            justify-content: space-between;
            img {
              display: inline-block;
              height: 37px;
              width: 37px;
              vertical-align: middle;
            }
            .time {
              display: inline-block;
              height: 25px;
              width: 25px;
              vertical-align: middle;
            }
            p {
              margin-left: 10px;
              span {
                font-size: 14px;
              }
            }
            button {
              font-size: 14px;
              display: inline-block;
              height: 30px;
              padding: 5px;
              margin-right: 6%;
              width: 50px;
              border: none;
              background: #ee0a24;
              color: #ffffff;
              border-radius: 3px;
            }
          }
        }
        .clock_list {
          width: 100%;
          background: #fff;
          padding-bottom: 5px;
          margin-bottom: 10px;
          li {
            margin-left: 20px;
            align-items: center;
            :last-child {
              padding-bottom: 4px;
            }
          }
          //打卡记录
          .history_recode {
            // margin-bottom: 10px;
            font-size: 15px;
            font-weight: bold;
            // margin-top: 10px;
          }
          .history_list {
            width: 100%;
            height: 30px;
            line-height: 30px;
            display: flex;
            font-size: 14px;
            align-items: center;
            :last-child {
              margin-bottom: 30px;
            }
            p {
              align-items: center;

              margin-left: 13px;
            }
          }
        }
        .twoBtn {
          width: 100%;
          margin: 10px auto;
          button {
            width: 100%;
            display: inline-block;
            padding: 10px;
            border: none;
            background: #4c42db;
            color: #ffffff;
            border: 0.5px solid #4c42db;
            border-radius: 2px;
            font-size: 14px;
          }
        }
      }
    }
    .food_wrap {
      width: 92%;
      margin: 10px 4%;
      .search_btn {
        width: 90%;
        margin: 10px auto;
        padding-bottom: 10px;
      }
      .history {
        height: auto;
        width: 100%;
        background: #fff;
        p {
          margin-left: 10px;
          padding: 10px;
          padding-bottom: 5px;
          font-size: 14px;
        }
        li {
          display: flex;
          justify-content: space-around;
          padding: 10px;
          color: #000;
          padding-top: 0;
          span {
            color: #333;
            letter-spacing: 1px;
          }
        }
      }
      .loader_btn {
        width: 100%;
        margin: 10px auto;
        button {
          width: 100%;
          display: inline-block;
          height: 44px;
          text-align: center;
          border: none;
          background: #fff;
          color: #07c160;
          border: 0.5px solid #07c160;
          border-radius: 2px;
          font-size: 14px;
        }
      }
      .title_none {
        margin: 30px auto;
        text-align: center;
        font-size: 15px;
        color: #cccccc;
      }
      .history_list_food {
        margin-top: 20px;
      }
    }
  }
}
.classnull {
  margin: 60px auto;
  text-align: center;
  font-size: 15px;
  color: #cccccc;
}
.yuanyuan {
  border: 1px solid cornflowerblue !important;
  background: cornflowerblue !important;
  color: #fff !important;
}
p.totalCount_1 {
  &::before {
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 30px;
    content: "";
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background-color: yellow !important;
  }
}
</style>
<style scoped></style>
