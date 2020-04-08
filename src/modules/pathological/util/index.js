function doHandleMonth(month){
  var m = month;
  if(month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}

export default {
  checkListHandler (nv, ov) {
    let ovHasNot = ov.indexOf('无')
    let nvHasNot = nv.indexOf('无')
    if (ovHasNot !== -1 && nvHasNot !== -1 && nv.length > ov.length) {
      nv.splice(nvHasNot, 1)
    }

    else if (ov.length && ovHasNot === -1 && nvHasNot !== -1) {
      nv.splice(0, nv.length - 1)
    }
  },
  fillZero (number) {
    return number >=0 && number <= 9 ? `0${number}` : `${number}`
  },
  dateFormatter (d) {
    if (!d) return ''

    let date = new Date(d)
    return `${date.getFullYear()}-${this.fillZero(date.getMonth() + 1)}-${this.fillZero(date.getDate())}`
  },
  timeFormatter (t) {
    if (!t) return ''

    let date = new Date(t)
    return `${date.getFullYear()}-${this.fillZero(date.getMonth() + 1)}-${this.fillZero(date.getDate())} ${this.fillZero(date.getHours())}:${this.fillZero(date.getMinutes())}`
  },
  addmulMonth (dtstr, n) { // n个月后
    let s  = dtstr.split("-")

    let yy = parseInt(s[0])
    let mm = parseInt(s[1] - 1)
    let dd = parseInt(s[2])
    let dt = new Date(yy, mm, dd)

    dt.setMonth(dt.getMonth() + n)

    if ((dt.getFullYear() * 12 + dt.getMonth()) > (yy * 12 + mm + n)) {
        dt = new Date(dt.getFullYear(), dt.getMonth(), 0)
    }

    let year  = dt.getFullYear()
    let month = dt.getMonth() + 1
    let days  = dt.getDate()

    return year + '-' + month + '-' + days
  },
  addmulDay (dtstr, n) {
    let day = new Date(dtstr)
    let targetday_milliseconds = day.getTime() + 1000 * 60 * 60 * 24 * n
    day.setTime(targetday_milliseconds)

    let tYear  = day.getFullYear()
    let tMonth = day.getMonth()
    let tDate  = day.getDate()

    tMonth     = doHandleMonth(tMonth + 1)
    tDate      = doHandleMonth(tDate)

    return tYear + '-' + tMonth + '-' + tDate
  }
}