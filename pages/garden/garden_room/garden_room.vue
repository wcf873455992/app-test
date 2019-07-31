<template>
	<view class="page">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">		
			<swiper-item v-for="carousel in carouselList">
				<navigator open-type="navigate" :url="'../movie/movie?trailerId=' + carousel.movieId">
					<image :src="carousel.image" class="carousel"></image>
				</navigator>
			</swiper-item>			
		</swiper>
		<!-- 园区信息 -->
		<view class="room-infolist">
			<view class="room-title">宇培·东硕空间705室</view>
			<view class="room-price">
				<view class="room-price_1">14530.04元/月</view>
				<view class="room-price_2">(3.04元/㎡·天)</view>
			</view>
			<view class="info2">
				<view class="info-low">
					<view class="">第7层</view>
					<view class="info-low1">楼层</view>
				</view>
				<view class="">
					<view class="">140.50㎡</view>
					<view class="info-low1">面积</view>
				</view>
				<view class="">
					<view class="">简装修</view>
					<view class="info-low1">装修</view>
				</view>
				<view class="">
					<view class="">可容纳约28个</view>
					<view class="info-low1">工位</view>
				</view>
			</view>
			<view class="houseyud">房源特色</view>
			<view class="houseyud2">租金单价增加1.2元/㎡·天，即可升级为超级办公室，拎包入驻办公。
租金单价增加0.16元/㎡·天，即可提供标准化保洁服务。
经典户型，房型方正，空间利用率高。
采光通透，租金低，性价比高，大面积，满足大中企业办公需求。</view>
			<view class="itxt2">
				<view class="">最短租期:面议</view>
				<view class="" style="margin-left: 30upx;">免租期:面议</view>
				<image src="../../../static/icos/for%20rent@2x.41f3034.png" class="image-rent"></image>
			</view>
		</view>
		<view class="estate-huimg">
			<view class="estate-huimg-t">房型图</view>
			<image src="http://img01.shdsjt.cn/Upload/HousesTypePictures/1712/377013218405.png" class="carousel"></image>
		</view>
		<view class="estate-huimg">
			<view class="location-t">位置及周边</view>
			<!-- <image src="http://img01.shdsjt.cn/Upload/HousesTypePictures/1712/377013218405.png" class="carousel"></image> -->
			<map class="location-map" :latitude="latitude" :longitude="longitude" :markers="covers">  </map>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carouselList:[
					{
						image:"../../../static/carousel/batmanvssuperman.png"
					},{
						image:"../../../static/carousel/spiderman.png"
					},{
						image:"../../../static/carousel/batmanvssuperman.png"
					},{
						image:"../../../static/carousel/spiderman.png"
					},{
						image:"../../../static/carousel/batmanvssuperman.png"
					}
				],
				roominfo: [],
				gardeninfo:[],
								
				latitude: 30.909,
				longitude: 120.39742,
				covers: [{
					latitude: 30.909,
					longitude: 120.39742,
					iconPath: '../../../static/icos/mark_bs.png'
				}, {
					latitude: 30.90,
					longitude: 120.39,
					iconPath: '../../../static/icos/mark_bs.png'
				}]
			}
		},
		onLoad(params) {
			// debugger;
			
			// var room_id = params.roomid;
			var room_id = 1;
			let headers = {};
			uni.request({
			  // url: this.$url + '/renren-api/api/login',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
				// url: 'http://106.15.235.217:8001/renren-api/api/garden/info/'+`${id}`, //仅为示例，并非真实接口地址。
				// url: this.serverUrl + '/api/garden/room='+`${room_id}`+ '&garden_id='+ '${gardenID}',
				url: this.serverUrl + '/api/room/info/'+`${room_id}`,
				method: 'POST',//get或post
				headers: headers,
				data: {
					// params: 1,
				},
				success: result => {
					console.log(result);									
					//返回的基本信息做本地缓存
					let data = result.data;
					if (data.code === 0) {									
						// this.$api.msg('加载成功');
						// let gardeninfo = data.garden;
						this.roominfo = data.room;
					} else {
						this.$api.msg(result.data.msg);
					}
				},
				fail: () => {
					uni.hideLoading();				
					// uni.navigateBack();  	
					this.$api.msg('网络连接失败');
				},
				complete: () => {},			   
			});	
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("garden_room.css");
</style>
