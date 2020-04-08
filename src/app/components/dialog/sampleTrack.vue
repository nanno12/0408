<template>
	<div class="ybgz-wrapper">
		<div class="header">
			<ul class='patient-info'>
				<li class="txm-name" :title="sampleInfo.TXM">
						<div class='txm' :title="sampleInfo.TXM">{{sampleInfo.TXM}}</div>
						<div class="sample-name" :title="sampleInfo.SAMPLENAME">{{sampleInfo.SAMPLENAME}}</div>
				</li>
				<li class="patient-name">{{sampleInfo.PATNAME}}</li>
				<li class="other-info">
					<span>{{sampleInfo.SEXDESC}}</span>
					<span>{{sampleInfo.AGE}}{{sampleInfo.AGEUNIT}}</span>
					<span class="card-no ellipsis" :title="`卡号：${sampleInfo.CARDNO===''? '无' : sampleInfo.CARDNO}`">
						卡号：{{sampleInfo.CARDNO===''? '无' : sampleInfo.CARDNO}}
					</span>
					<span>科室：{{sampleInfo.APPLYDEPTNAME===''?'无':sampleInfo.APPLYDEPTNAME}}</span>
					<span class="ellipsis clinic" :title="`诊断：${sampleInfo.CLINICDESC===''?'无':sampleInfo.CLINICDESC}`">诊断：{{sampleInfo.CLINICDESC===''?'无':sampleInfo.CLINICDESC}}</span>
        </li>
			</ul>
		</div>
		<sample-track-content :sample-track-data="sampleTrackData"></sample-track-content>
	</div>

</template>

<script>
  import SampleTrackContent from'./sampleTrackContent.vue'
	export default {
		data() {
			return {
				sampleInfo: {}, //标本信息数据
        sampleTrackData:{ //要传给content的数据
					sampleinfo:{
              MJZBZ:''
					}
				},
			};
		},
		created(){
      this.$nextTick(() => {
        this.$root.eventHub.$on('bgsh/ybgzDialog',data => {
          this.sampleInfo=data.sampleinfo;
					this.sampleTrackData=data;
         })
      });
    },

    filters: {
      //处理流程节点时间格式
      handleNodeDate:function(data){
        if(data!==undefined){
          return data.substr(2,14);
        }
      },
      //处理价格小数位数
      handlePrice(val){
        return Number(val).toFixed(2);
      },
    },
    components: {
      SampleTrackContent
    }
	};
</script>
<style lang="stylus" scoped>

	.ybgz-wrapper{
		font-size 12px
		height 100%
		.header{
			height: 40px;
			background: url(../../assets/image/ybgz-bd.png) no-repeat;
			background-size: 100% 100%;
			padding: 0;
		}
		.sampling-track-content{
			height calc(100% - 40px)
		}
	}

	/* 患者信息开始 */
	.patient-info {
		display flex
		align-items flex-end
		padding  0 0 10px 7%;
		height 100%
		width 100%
		.other-info{
			line-height:18px;
			span{
				float left
				margin-right 5px
			}
			.card-no{
				max-width 180px
			}
			.clinic{
				max-width 200px
			}
		}
	}
	.patient-info .txm-name {
		width 31%
		display inline-flex
		align-items flex-end
		line-height: 32px;
		justify-content space-between
	}
	.patient-info .sample-name{
		text-align right
		max-width calc(20% - 5px)
		margin-right 5px
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	}
	.patient-info .txm{
		float left
		font-weight bold
		font-size 25px
		max-width calc(80% - 10px)
		margin-right 10px
		overflow hidden
		text-overflow ellipsis
		white-space nowrap
	}
	.patient-info .patient-name{
		color #AC1D27
		font-weight bold
		font-size 22px
    margin:0 10px 0 20px;
	}

</style>
<style lang="stylus">
</style>
