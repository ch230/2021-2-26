export default {
  //免登陆
  getUserNameByCode: "/devserver/welink/getUserNameByCode",
  //鉴权
  getTargetUrl:
    "/devserver/welink/getAuthenticationInfoByWelinkNameAndTargetUrl",
  //获取个人信息
  getInfoByEmployeeNumber: "/devserver/yiKaTongUser/getInfoByEmployeeNumber",
  //餐饮消费数据接口
  list: "/devserver/yiKaTongExpenseDetail/queryList",
  //打卡接口
  save: "/devserver/attendanceClock/save",
  //查询个人所有考勤数据接口
  clockList: "/devserver/tbkqdetail/queryPersonList",
  //按月份查询考勤
  allList: "/devserver/tbkqdetail/queryListByAppointMonth"
};
