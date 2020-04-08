/**
 * 时间转换指定格式08-02 20:06
 */
export function dateTimeDiff(beginTimeStr,endTimeStr){
	var beginTime=parserDate(beginTimeStr);  //开始时间
	var endTime=parserDate(endTimeStr);  //结束时间
	
	var date2=new Date();    //结束时间
	var diff=endTime.getTime()-beginTime.getTime()  //时间差的毫秒数
	 
	
	//计算出相差天数
	var days=Math.floor(diff/(24*3600*1000))
	 
	//计算出小时数
	
	var leave1=diff%(24*3600*1000)    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave1/(3600*1000))
	//计算相差分钟数
	var leave2=leave1%(3600*1000)        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000))
	 
	
	//计算相差秒数
	var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
	var seconds=Math.round(leave3/1000)
	
	var diffInfo={
		Days:days,
		Hours:days,
		Minutes:days,
		Seconds:seconds
	}
	
	//alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
	return diffInfo;
}
 


export function parserDate(str){
	str = str.replace(/-/g,"/");
	var dt = new Date(str);
	return dt;
}
