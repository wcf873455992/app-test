<template>
	<view class="page">

		<view class="search-block">
			<view class="search-ico-wapper">
				<image src="../../static/icos/search.png" class="search-ico"></image>
			</view>
			<input placeholder="搜索" maxlength="10" class="search-text" confirm-type="search" @confirm="searchMe" />
		</view>
		<view class="">首页	1	</view>
		<view class="garden-list page-block">
			<!-- <image src="http://122.152.205.72:88/superhero/DC/GreenLantern/cover.jpg" class="image-garden"></image> -->
			<!-- H5控制层填加@CrossOrigin -->
			<view class="single-garden" v-for="(gardeninfo,index) in gardenList" :key="index"
			:data-gardenId="gardeninfo.gardenId"
			@click="showGardenDetail"
			>
				<image :src="gardeninfo.image" class="image-garden"></image>

				<view class="garden-desc">					
					<view class="garden-title">
						<view class="garden-title1">{{gardeninfo.gardenName}}</view>
						<view class="garden-title2">可租{{gardeninfo.vacantRoom}}套</view>
					</view>
					<view class="garden-info">{{gardeninfo.location}}</view>
					<view class="garden-info">{{gardeninfo.address}}</view>
					<view class="garden-info">{{gardeninfo.acreage}}</view>
					
					<view class="garden-operator">
						<view class="garden-title">自营	</view>						
						<view class="garden-info">{{gardeninfo.prices}}</view>
					</view>
					
				</view>
			</view>
			<view class="single-garden" >
				<image src="http://122.152.205.72:88/superhero/DC/GreenLantern/cover.jpg" class="image-garden"></image>
			
				<view class="garden-desc">					
					<view class="garden-title">
						<view class="garden-title1">东硕空间</view>
						<view class="garden-title2">可租50套</view>
					</view>
					<view class="garden-info">上海·闵行·莘庄</view>
					<view class="garden-info">伟业路621弄</view>
					<view class="garden-info">100㎡</view>
					
					<view class="garden-operator">
						<view class="garden-title">自营	</view>						
						<view class="garden-info">35元</view>
					</view>
					
				</view>
			</view>
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				trailerList: [],
				keywords: "", // 搜索的关键字
				currPage: 1, // 当前第几页
				totalPage: 1 ,// 总页数
				gardenList: []
			};
		},
		onPullDownRefresh() {
			this.refresh();
			uni.hideLoading();
		},
		onLoad() {
			var me = this;

			// uni.showLoading({
			// 	mask: true,
			// 	title: "请稍后..."
			// });
			// uni.showNavigationBarLoading();

			var serverUrl = me.serverUrl;
			// 查询猜你喜欢数据列表
			// uni.request({
			// 	url: serverUrl + '/search/list?keywords=&page=&pageSize=',
			// 	method: "POST",
			// 	success: (res) => {
			// 		// 获取真实数据之前，务必判断状态是否为200
			// 		if (res.data.status == 200) {
			// 			// debugger;
			// 			var trailerList = res.data.data.rows;
			// 			me.trailerList = trailerList;
			// 		}
			// 	},
			// 	complete: () => {
			// 		uni.hideNavigationBarLoading();
			// 		uni.hideLoading();
			// 	}
			// });
			// 
			// debugger;
			this.refresh();
		},
		onReachBottom() {
			var me = this;

			var currPage = me.currPage + 1; // 查询下一页面，当前页数累加1
			var keywords = me.keywords; // 获得当前页面中data里的搜索值
			var totalPage = me.totalPage; // 获取总页数

			// 如果当前需要分页的分页数和总页数相等，就不分页
			if (currPage > totalPage) {
				return;
			}

			me.pagedTrailerList(keywords, currPage, 15);

		},
		methods: {
			refresh(){
				uni.showLoading({
					title:'加载中'
				});
				uni.request({
				  // url: this.$url + '/renren-api/api/login',//此处使用了全局变量拼接url（main.js文件中），关于全局变量官方问答里有
					// url: 'http://106.15.235.217:8001/renren-api/api/garden/list', 
					url: this.serverUrl + '/api/garden/list', 
					method: 'POST',//get或post
					// headers: headers,
					data: {
						params: 1,
					},
					success: result => {
						console.log(result);									
						//返回的基本信息做本 地缓存
						let data = result.data;
						if (data.code === 0) {									
							// this.$api.msg('加载成功');
							let gardenList = data.page.list;
							this.gardenList = gardenList|| [];
							// this.gardenList = gardenList;
						} else {
							// this.$api.msg(result.data.msg);
						}						
						uni.hideLoading();
					},
					fail: () => {
						uni.hideLoading();
						// uni.hideLoading();				
						// uni.navigateBack();  	
						// this.$api.msg('网络连接失败');
					},
					complete: () => {
						uni.hideLoading();
					},
				});	
			},
			showGardenDetail(e) {
				var gardenId = e.currentTarget.dataset.gardenid;
				// var gardenId = 1;
				// 页面跳转接口api
				uni.navigateTo({
					url: "../garden/garden_details/garden_details?gardenId=" + gardenId
				})
			},
			pagedTrailerList(keywords, page, pageSize) {
				var me = this;

				uni.showLoading({
					mask: true,
					title: "请稍后..."
				});
				uni.showNavigationBarLoading();

				var serverUrl = me.serverUrl;
				// 查询猜你喜欢数据列表
				uni.request({
					// url: serverUrl + '/search/list?keywords=' + keywords
					// 										+ '&page=' + page
					// 										+ '&pageSize=' + pageSize,
					url: serverUrl + '/api/garden/list',
					method: "POST",
					success: (res) => {
						// 获取真实数据之前，务必判断状态是否为200
						if (res.data.status == 200) {
							// debugger;
							var tempList = res.data.data.rows;
							me.trailerList = me.trailerList.concat(tempList);
							me.totalPages = res.data.data.total; // 获取总页数
							me.page = page; // 覆盖当前页面里的page
						}
						
						uni.hideLoading();
					},
					complete: () => {
						uni.hideNavigationBarLoading();
						uni.hideLoading();
					}
				});
			},
			searchMe(e) {
				var me = this;
				// 获取搜索的内容
				var value = e.detail.value;
				me.keywords = value;
				me.trailerList = [];

				me.pagedTrailerList(value, 1, 15);
			}
		}
	}
</script>

<style>
	@import url("index.css");
</style>
