/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export default {
  /**
   * 数字格式化
   * @param s 需要格式化数字  4222.3363
   * @param n 取小数点后位数  2
   * @param comma 是否带逗号   true显示带逗号，false显示不带逗号
   * @param f 是否显示0   true显示0 false显示''
   * @type int
   * @returns 4,222.34或者 4222.34
   */
  fmoney: function (s, n, comma, f) {
    var flag = '0',
      result; //  是否带逗号
    if (!s || s == "") {
      if (f) {
        return 0;
      }
      return '';
    }
    s = s.toString();
    //记录负号标志
    if (s.substring(0, 1) == '-') {
      s = s.substring(1, s.length);
      flag = '1';
    }

    n = n >= 0 && n <= 20 ? n : 2;
    // s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    s = (s + "").replace(/[^\d\.-]/g, "") + "";
    s = s * 1 * Math.pow(10, n);
    let tempInt = parseInt(s) + 0.5;
    if (Math.abs(tempInt - s) < 0.00000001) {
      s = tempInt;
    }
    s = Math.round(s) / Math.pow(10, n);
    s = parseFloat(s + "").toFixed(n) + "";
    if (comma) {
      var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
      }
      result = t.split("").reverse().join("");
      if (n > 0) {
        result += "." + r;
      }
    } else {
      result = s;
    }

    if (flag == 1)
      result = "-" + result;
    var re = /^(\-)?0.0+$/;
    if (re.test(result)) {
      result = "0";
    }
    if (!f) {
      if (parseFloat(result) == 0)
        result = "";
    }
    return result;
  },

  getNowTime: function (data) {
    //获取当前时间
    if (data) {
      var date = new Date(data);
    } else {
      var date = new Date();
    }

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var nowDate = year + "-" + month + "-" + day;
    return nowDate;
  },
  //日期加一天的方法
  addDay:function(date,days){
    if (days == undefined || days == '') {
      days = 1;
      }
      var date = new Date(date);
      date.setDate(date.getDate() + days);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return date.getFullYear() + '-' + month + '-' + day;
  },
  //日期减少的方法
  reduceDay:function(date,days){
    if (days == undefined || days == '') {
      days = 1;
      }
      var date = new Date(date);
      date.setDate(date.getDate() - days);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      return date.getFullYear() + '-' + month + '-' + day;
  },
  //月份到期时间计算 data要相加或相减的日期,n表示要加或减几个月，type表示要相加或者相减
  addData: function (dtstr, n) { // n个月后 
    var s = dtstr.split("-");
    var yy = parseInt(s[0]);
    var mm = parseInt(s[1] - 1);
    var dd = parseInt(s[2]);
    var dt = new Date(yy, mm, dd);
    dt.setMonth(dt.getMonth() + n);
    if ((dt.getYear() * 12 + dt.getMonth()) > (yy * 12 + mm + n)) {
      dt = new Date(dt.getYear(), dt.getMonth(), 0);
    }
    
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var days = dt.getDate() - 1;
    if(days==0){
      month=month-1
      if (month == 2) {
        days = year % 4 == 0 ? 29 : 28;
      } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31;
      } else {
        //其他月份，天数为：30.
        days = 30;
      }
    }
    if(month==0){
      year=year-1
      month=12
    }
    var dd = year + "-" + month + "-" + days;
    return dd;
  },
  addYear:function(dtstr,n){
    var s = dtstr.split("-");
    var yy = parseInt(s[0]);
    var mm = parseInt(s[1] - 1);
    var dd = parseInt(s[2]);
    var dt = new Date(yy, mm, dd);
    dt.setYear(dt.getFullYear() + n/12);
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var days = dt.getDate() - 1;
    
    // if(days==0){
    //   month=month-1
    //   if (month == 2) {
    //     days = year % 4 == 0 ? 29 : 28;
    //   } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
    //     //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
    //     days = 31;
    //   } else {
    //     //其他月份，天数为：30.
    //     days = 30;
    //   }
    // }
    // if(month==0){
    //   year=year-1
    //   month=12
    // }
    var dd = year + "-" + month + "-" + days;
    return dd;
  },
  reduceData: function (dtstr, n) { // n个月后 
    var s = dtstr.split("-");
    var yy = parseInt(s[0]);
    var mm = parseInt(s[1] - 1);
    var dd = parseInt(s[2]);
    var dt = new Date(yy, mm, dd);
    dt.setMonth(dt.getMonth() - n);
    if ((dt.getYear() * 12 + dt.getMonth()) > (yy * 12 + mm + n)) {
      dt = new Date(dt.getYear(), dt.getMonth(), 0);
    }
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var days = dt.getDate();
    var dd = year + "-" + month + "-" + days;
    return dd;
  },

  //两个月份相减 
  //date1 结束时间，date2 开始时间
  Monthreduce: function (date1, date2) {
    if (!date1 instanceof Date) {
    }
    let a = new Date(date1)
    let b = new Date(date2)
    // if (!date1 instanceof Date){
    //     console.error('param date1 is not Date');
    // }
    // if (!date2 instanceof Date){
    //     console.error('param date2 is not Date');
    // }
    var months1 = a.getFullYear() * 12 + a.getMonth();
    var months2 = b.getFullYear() * 12 + b.getMonth();

    //计算天数
    //获取年份
    var year = b.getFullYear();
    //获取当前月份
    var month = b.getMonth() + 1;

    //定义当月的天数；
    var days;
    //当月份为二月时，根据闰年还是非闰年判断天数
    if (month == 2) {
      days = year % 4 == 0 ? 29 : 28;
    } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      //月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
      days = 31;
    } else {
      //其他月份，天数为：30.
      days = 30;
    }
    let mont=months1 - months2;
    //获取开始使用的天数
    let b_day =b.getDate();
    let a_day =a.getDate();
    if(days-b_day+a_day<15){
      mont=mont-1
    }else{
     
    }
    return mont;
  }
}
