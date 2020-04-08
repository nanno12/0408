<!--
* @author lei
* @date 2017-11-28
* @module 仪器列表
* @explain 仪器列表
-->
<template>
  <div class="inst-list">
    <label class="inst-label">{{label}}</label>
    <input :value="instName"
           class="inst-input"
           @click.stop="necListShow=!necListShow;"
           @change="inputFun"
           :readonly='isReadonly'
           ref="input">
    <i :class="[cfyListShow  ? 'el-icon-caret-top':'el-icon-more','inst-icon',multiple?'multipHidd':'']" @click.stop="cfyListShow=!cfyListShow"></i>
    <!--未分类仪器列表-->
    <ul class="nec-list" v-show="necListShow" ref="necList">
      <li v-for="(item,index) in necList"
          :key="index"
          @click="listClick(item)"
          :class="[selectDisDicObj.DICID==item.DICID?'active':'',multiple&&value.indexOf(item.DICID)>-1?'selected':'']">
        <span class="ellipsis inlB leftCode" :class="[multiple&&value.indexOf(item.DICID)>-1?'selected':'']">{{item.CODE}}</span>
        <span class="ellipsis inlB rightName" :class="[multiple&&value.indexOf(item.DICID)>-1?'selected':'']">{{item.NAME}}</span>
      </li>
    </ul>
    <!--未分类仪器列表-->

    <!--分类仪器列表-->
    <div class="cfy-Box" v-show="cfyListShow && !multiple" ref="cfyList">
      <ul class="cfy-list">
        <li v-for="(item,index) in cfyList"
            :key="index"
            :class="[selectDisDicObj.DICTYPE==item.name?'active':'']">
          <span class="dictype">{{item.name}}</span>
          <ul class="child-list">
            <li @click="listClick(secItem)"
                v-for="(secItem,secIndex) in item.children"
                :key="secIndex"
                :class="[selectDisDicObj.DICID==secItem.DICID?'sub-active':'']">
              <span class="ellipsis inlB leftCode">{{secItem.CODE}}</span>
              <span class="ellipsis inlB rightName">{{secItem.NAME}}</span>
            </li>
            <li class="splitLine"></li>
          </ul>
        </li>
      </ul>
    </div>
    
  </div>
</template>
<script>
  export default {
      data() {
          return {
            necListShow:false, //未分类仪器列表显示/隐藏
            cfyListShow:false, //分类仪器列表显示/隐藏
            necList:[],//未分类仪器列表
            cfyList:[], //分类仪器列表
            selectDisDicObj:{},//当前选中的仪器
            inst:'',//选中的仪器名称
            selectedList:[],//多选模式下选择的列表
          }
      },
      props:{
        defaultClick:{ //是否默认点击第一个仪器
          type:Boolean,
          default:false
        },
        label:{  //label名称
          type:String,
          default:''
        },
        value:{
          type:[Number,Array,String],
          default:''
        },
        multiple:{
          type:Boolean,
          default:false
        },
        instList:{
          type:Array,
          default: () => {
                return []
            }
        },//未分类仪器列表
        isReadonly:{//是否只读
          type:Boolean,
          default:false
        }
      },
      created() {
        this.$nextTick( () => {
          //点击其他其余关闭仪器列表
          document.addEventListener("click", e => {
            if(this.$refs.cfyList) {
              let cfyList = this.$refs.cfyList;
              if (!cfyList.contains(e.target)) {
                this.cfyListShow = false;//分类仪器隐藏
              }
              let necList = this.$refs.necList;
              if (!necList.contains(e.target)) {
                this.necListShow = false;//未分类仪器隐藏
              }
            }
          });
        })
      },

      computed: {
        instName(){
         if(!this.multiple){ //单选模式下
           let item=this.necList.find(item=>{
             return item.DICID===this.value;
           });
           if(item){
             return item.NAME.trim();
           }

           return ''
         }else{
           let list=[];
           this.value.forEach(item=>{
             let exist=this.necList.find(listItem=>{
               return listItem.DICID===item;
             });
             if(exist){
               list.push(exist.NAME.trim());
             }
           });
           return String(list);
         }
        },
      },
      watch:{
        // 检测value的变化，模拟点击一次列表，目前只考虑单选模式
        value(val){
          // console.log(val)
          if(!this.multiple){ //单选
            let item=this.necList.find(item=>{
              return item.DICID === val;
            });
            if(item){
              this.handleListClick(item);
              // console.log(item,443);
              this.selectDisDicObj = item;
            }
          }
        },
        //watch 未分类列表，如果打开，则分类列表为true
        necListShow(val){
          if(val){
            this.cfyListShow = false;
          }
        },
        //watch 分类列表，如果打开，则未分类列表为true
        cfyListShow(val){
          if(val){
            this.necListShow = false;
          }
        },
        instList(val) {
          this.necList = this.instList
          // console.log(this.value,111)
          if(this.defaultClick){
              //默认点击未分类仪器第一个
              if(this.necList.length < 1) {
                this.$emit('update:value','')
                return false;
              }
              this.$emit('update:value', this.necList[0].DICID);
            }else if(this.value){
              let item=this.necList.find(item=>{
                return item.DICID===this.value;
              });
              if(item){
                this.handleListClick(item);
              }
            }
          this.formatInitData(this.necList);
        },
      },
      mounted() {
        this.necList = this.instList;
        if(this.necList.length < 1){
          return false;
        }
        if(this.defaultClick){
          this.selectDisDicObj = this.necList[0];
        }
        setTimeout(() => {
          this.formatInitData(this.necList);
        },30)
      },
      methods: {
        inputFun(e){
          this.$emit('inputValue',e.target.value);
        },

        //仪器数据处理 =》 分类
        formatInitData(list) {
          let dictypeArr = list
            .map(item => [item.DICTYPE])
            .reduce((a, b) => a.concat(b))
            .distinct()
            .map(item => ({
              name: item,
              children: []
            }));

          list.map(item => {
            dictypeArr.map(newItem => {
              if (item.DICTYPE === newItem.name) {
                newItem.children.push(item);
              }
            })
          });
          // console.log(dictypeArr);
          this.cfyList = dictypeArr;
        },
        listClick(item) {
          if(!this.multiple){
            this.$emit('update:value', item.DICID);
          }else{//多选
           this.$emit('aa',item.DICID);
           
            // console.log(this.value)
            // console.log(event.target.className)
            // let newValue=[...new Set(this.value)];
            // let calssname=event.target.className
            // if(calssname=='selected'){
            //   this.value.findIndex((item1,index)=>{
            //     if(item1==item.DICID){
            //       this.value.splice(index,1)
            //     }
            //   })
            // }
          }
          this.cfyListShow = false;//分类仪器隐藏
          this.necListShow = false;//未分类仪器隐藏
        },
        //仪器列表点击事件
        handleListClick(item) {
          // console.log(item);
          if(!this.multiple){ //单选
            this.cfyListShow = false;//分类仪器隐藏
            this.necListShow = false;//未分类仪器隐藏
            this.selectDisDicObj = item;
            this.$emit('change',item);
          }else{ //多选
            let exist=this.value.findIndex(listItem=>{
              return item.DICID===listItem;
            });
            let value=Object.assign([],this.value);
            if(exist>-1){
              value.splice(exist,1);
            }else{
              value.push(item.DICID);
            }
            this.$emit('update:value',value);
          }
        },
      },
      components: {}
  }


</script>
<style lang="stylus" scoped>
  .inst-list{
    position relative
    height 26px
    line-height 26px
    .inst-label{
      float left
      overflow hidden
      margin-right 12px
      font-size:12px
    }
    .inst-input{
        position relative
        overflow hidden
        height 26px;
        border-radius 2px;
        border 1px solid #bfcbd9
        padding 3px 10px;
        vertical-align bottom
        width calc(100% - 60px)
        cursor pointer
        &:focus{
          border-color: #20a0ff;
        }
      }
    .inst-icon{
      position: absolute;
      top: 2px;
      right: 0px;
      height: 100%;
      line-height: 26px;
      width: 26px;
      text-align: center;
      cursor: pointer;
    }
    .multipHidd{
      display none
    }
  }



  //    未分类仪器列表
  .nec-list {
    position: absolute;
    top: 35px;
    right: 0;
    z-index: 21;
    border: 1px solid #d1d1d1;
    background: #fff;
    width: 200px;
    max-height: 332px;
    overflow: auto;
  }

  .nec-list > li {
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    &:hover {
      background-color: #e4e8f1;
    }
    &.active {
      color: #fff;
      background-color: #20a0ff;
    }
    &.selected{
      color: #20a0ff;
     // background-color: #20a0ff;
    }

    .leftCode {
      width: 66px;
      margin-left: 12px;
      margin-right: 12px;
      border-right: 1px solid #dfdfe1;
    }
    .rightName{
      width: 90px;
    }
  }

  //    分类仪器列表
  .cfy-Box{
    position: absolute;
    left: 0;
    top: 30px;
    height: 332px;
    width 100%
    z-index 21
    min-width: 280px;
    box-shadow: -1px 3px 7px rgba(0,0,0,0.2);
  }
  .cfy-list {
    width 100%
    height: 332px;
    overflow-y: auto;
    z-index: 21;
    background: #fff;
    border: 1px solid #d1d1d1;
  }

  .cfy-list > li {
    height: 36px;
    background: #fff;
    line-height: 36px;
  }

  .cfy-list > li.active a {
    color: #fff;
    background-color: #20a0ff;
  }

  .cfy-list a {
    display: block;
    width: 23%;
    padding-left: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #000;
  }

  .cfy-list a:hover {
    color: #fff;
    background-color: #e4e8f1;
  }

  .cfy-list > li.active .dictype {
    color: #fff;
    background-color: #20a0ff;
  }

  .cfy-list .dictype {
    display: block;
    width: 72px;
    padding-left: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #000;
  }

  .cfy-list .dictype:hover {
    color: #fff;
    cursor: pointer;
    background-color: #e4e8f1;
  }

  .cfy-list > li.active ul, .cfy-list > li:first-child ul{
    left: 72px;
  }

  .cfy-list li:hover > ul {
    left: 72px;
    z-index: 21;
  }

  .cfy-list ul {
    position: absolute;
    left: -1000px;
    top: 1px;
    width: calc(100% - 72px);
    height: 330px;
    background-color: #fff;
  }

  .child-list {
    position: absolute;
    top: 46px;
    z-index: 20;
    width: 184px;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: -1px 0px 10px rgba(0, 0, 0, 0.1)
  }

  .child-list > li {
    height: 36px;
    line-height: 36px;
    cursor: pointer;
  }

  .child-list > li:hover {
    background-color: #e4e8f1;
  }

  .child-list > li .leftCode {
    
    width: 80px;
    margin-left: 12px;
    margin-right: 12px;
    border-right: 1px solid #dfdfe1;
  }
  .child-list > li .rightName {
    
    width: 90px;
  }

  .splitLine {
    left: 91px;
  }
  //分类列表结束


</style>
