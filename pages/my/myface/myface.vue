<template>
	<view class="page page-fill">
		
		<view class="pending-wapper">
			<image id="face" :src="tempFace" class="pending-face" mode="scaleToFill"></image>
		</view>
		
		<view class="notice">
			<view class="notice-words">
				* 请从相册中选择等比宽高的图片噢~
			</view>
		</view>
		
		<view class="footer-opertor">
			<view class="opertor-words" @click="changePendingFace">
				重新选择
			</view>
			<view class="opertor-words" @click="upload">
				确认上传
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tempFace:"",
			}
		},
		onLoad(params) {
			var tempFilePath = params.tempFilePath;
			this.tempFace = tempFilePath;
		},
		methods: {
			
		}
	}
</script>

<style>
@import url("myface.css");
</style>
