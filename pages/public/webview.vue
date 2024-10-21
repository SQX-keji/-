<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(res) {
			return {
				title: '',
				path: '/pages/index/index'
			};
		},
		data() {
			return {
				url: 'https://bwc.xianmxkj.com',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			};
		},
		onLoad(e) {
			if (e.title) {
				uni.setNavigationBarTitle({
					title: e.title
				});
			}
			if (e.url) {
				let uurl = this.$queue.getData('rechargeUrl');
				if (uurl) {
					console.log(uurl)
					this.url = uurl;
				} else {
					this.url = e.url;
				}
			} else {
				uni.navigateBack();
			}
		},
		onPullDownRefresh: function() {
			uni.stopPullDownRefresh(); // 停止刷新
		},
		methods: {}
	};
</script>

<style>
	@import '../../static/css/index.css';
</style>
