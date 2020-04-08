const TimerWatch = function () {
    var timeCount = 0;
    var startTime = null;
    var endTime = null;
    var timeNow = null;
    var me = this;
    this.Start = function () {
        me.timeNow = new Date();
        me.startTime = this.timeNow.getTime();
    };
    this.Stop = function () {

        me.timeNow = new Date();
        me.endTime = me.timeNow.getTime();
        me.timeCount = me.endTime - me.startTime;
    };
    this.Reset = function () {

        me.timeCount = 0;
        me.startTime = null;
        me.endTime = null;
        me.timeNow = new Date();
    };
    this.Restart = function () {
        me.Reset();
        me.startTime = me.timeNow.getTime();
    };
    this.StopShowWatch = function (desc) {
        desc = desc || "";
        me.Stop();
        console.log("【"+desc+"】监测计时：" + (me.timeCount / 1000) + "s  ;合计：" + (me.timeCount) + "ms");
    };
    this.ShowWatch = function () {
        me.timeNow = new Date();
        me.endTime = me.timeNow.getTime();
        me.timeCount = me.endTime - me.startTime;
        console.log("监测计时：" + (me.timeCount / 1000) + "s  ;合计：" + (me.timeCount) + "ms");
    }
}

export default TimerWatch