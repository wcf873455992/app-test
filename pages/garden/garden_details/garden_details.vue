<template>
	<view class="page">
		<!-- 轮播图 start -->
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">		
			<swiper-item v-for="carousel in carouselList">
				<navigator open-type="navigate" :url="'../movie/movie?trailerId=' + carousel.movieId">
					<image :src="carousel.image" class="carousel"></image>
				</navigator>
			</swiper-item>		
		</swiper>
		<!-- 轮播图 end -->
		
		<!-- 园区信息 -->
		<view class="garden-desc">
			<view class="estateAddress">
				<view class="garden-title">
					<view class="titleB">{{buildinginfo.name}}</view>
					<view class="title2">可租{{buildinginfo.waittingrentcount}}套</view>
				</view>
				<view class="room-content">{{buildinginfo.address}}</view>
				<view class="room-content">{{buildinginfo.buildingaddress}}</view>
				<view class="room-content">{{buildinginfo.unitprice}}</view>
				<view class="room-content">{{buildinginfo.areas}}</view>
			</view>
			<view class="estateContent">
				<view class="room-content1">入住企业</view>
				<view class="room-details">{{buildinginfo.settledenterprise}}</view>
				<view class="room-content2">楼盘特点</view>
				<!-- <text class="room-details">{{buildinginfo.features}}</text> -->
				<view class="room-details">{{buildinginfo.features}}</view>				
			</view>
		</view>
		<view class="estateHouses">
			<view class="garden-title">
				<view class="title">房源销控图</view>
				<view class="title">房源清单</view>
			</view>
			<view class="RentInfo">更新时间:2019年7月20日------待租、已收定、已租</view>
			
			<view class="RentControlList">
				<view class="UintNoTitle">C栋</view>
				<view class="garden-rooms">
					<view class="garden-room"
					:data-roomid="101"
					:data-buildingId = "buildinginfo.Id"
					@click="showRoomDetail"
					>
						<view class="info">1701</view>
						<view class="info">200㎡|3.5元</view>
					</view>
				</view>
				<view class="UintNoList">
					<view class="HouseListTitle">8F</view>
					<view class="HouseList">
						<view class="HouseItem">							
							<view class="info">1701</view>
							<view class="info">200㎡|3.5元</view>
						</view>
						<view class="HouseItem">							
							<view class="info">1701</view>
							<view class="info">200㎡|3.5元</view>
						</view>
						<view class="HouseItem">							
							<view class="info">1701</view>
							<view class="info">200㎡|3.5元</view>
						</view>
						<view class="HouseItem">							
							<view class="info">1701</view>
							<view class="info">200㎡|3.5元</view>
						</view>
						<view class="HouseItem">							
							<view class="info">1701</view>
							<view class="info">200㎡|3.5元</view>
						</view>
					</view>
				</view>
				<view class="UintNoList">
					<view class="HouseListTitle">9F</view>
					<view class="HouseList">
						<view class="HouseItem">							
							<view class="info">1701</view>
							<view class="info">200㎡|3.5元</view>
						</view>
						<view class="HouseItem">							
							<view class="info">1701</view>
							<view class="info">200㎡|3.5元</view>
						</view>
						<view class="HouseItem">							
							<view class="info">1701</view>
							<view class="info">200㎡|3.5元</view>
						</view>
						<view class="HouseItem">							
							<view class="info">1701</view>
							<view class="info">200㎡|3.5元</view>
						</view>
						<view class="HouseItem">							
							<view class="info">1701</view>
							<view class="info">200㎡|3.5元</view>
						</view>
					</view>
				</view>	
			</view>
			
			<view class="estate-detail">
				<view class="title">楼盘简介</view>
				<view class="room-info">
					<view class="room-info1">						
						<view class="lable">总楼层</view>
						<view class="lable-cnt">{{buildinginfo.floornum}}</view>						
					</view>
					<view class="room-info1">						
						<view class="lable">建筑面积</view>
						<view class="lable-cnt">{{buildinginfo.area}}</view>						
					</view>
					<view class="room-info1">						
						<view class="lable">标准层高</view>
						<view class="lable-cnt">{{buildinginfo.floorheight}}</view>						
					</view>
					<view class="room-info1">						
						<view class="lable">开发商</view>
						<view class="lable-cnt">{{buildinginfo.developer}}</view>						
					</view>
					<view class="room-info1">						
						<view class="lable">物业公司</view>
						<view class="lable-cnt">{{buildinginfo.propertycompany}}</view>						
					</view>
				</view>
				<view class="building-text">{{buildinginfo.description}}</view>
			</view>
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
				buildinginfo: []
			}
		},
		onLoad(params){
			// debugger;
			//接收传值,id里面放的是标题，因为 测试数据并没写id 
			// let id = options.id;
			let id = 1;
			if(id){
				// this.$api.msg(`点击了${id}`);
			}
			// this.shareList = await this.$api.json('shareList');
			var buildingid = params.buildingId;
			let headers = {};
			uni.request({
			  // url: this.$url + '/renren-api/api/login',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
				// url: 'http://106.15.235.217:8001/renren-api/api/garden/info/'+`${id}`, //仅为示例，并非真实接口地址。
				url: this.serverUrl + '/api/building/info/'+`${buildingid}`,
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
						this.buildinginfo = data.building;
					} else {
						// this.$api.msg(result.data.msg);
					}
				},
				fail: () => {
					uni.hideLoading();				
					// uni.navigateBack();  	
					// this.$api.msg('网络连接失败');
				},
				complete: () => {},			   
			}); 
			
			// uni.request({
			// 	url: 'http://wapm2.shdsjt.cn/api/Houses/GetBuildingRentControl',
			// 	data: {buildingId : 5856, },
			// 	method:"POST",
			// 	header : {'content-type':'application/x-www-form-urlencoded'},				
			// 	success: function (res) {
			// 		console.log(res.data);
			// 	}
			// });
			// debugger;
		},
		methods: {
			showRoomDetail(e) {
				var roomid = e.currentTarget.dataset.roomid;		//变量小写
				var gardenId = e.currentTarget.dataset.gardenid;			//变量小写
				
				// var gardenId = 1;
				// 页面跳转接口api
				uni.navigateTo({
					// url:"../garden_room/garden_room?roomnumber=" + roomNumber + '&gardenId='+gardenId,
					url:"../garden_room/garden_room?roomid=" + roomid
				})
			},
		}
	}
</script>

<style>
@import url("garden_details.css");
</style>
