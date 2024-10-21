<script>
	import Vue from 'vue';
	export default {
		methods: {
		},
		onLaunch: function() {
			let that = this;
			//获取全局邀请码
			that.$Request.getT('/common/type/88').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('publicRelation', res.data.value);
					}
				}
			});
			// 微信单笔提现最大金额
			that.$Request.getT('/common/type/86').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('WxMaxMoney', res.data.value);
					}
				}
			});
			// 微信单笔提现最大金额
			that.$Request.getT('/common/type/170').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('fensiImage', res.data.value);
					}
				}
			});
			// 微信提现是否显示
			that.$Request.getT('/common/type/168').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('wxCashSelect', res.data.value);
					}
				}
			});
			// 商户端微信小程序APPID	139
			that.$Request.getT('/common/type/139').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('shopAppId', res.data.value);
					}
				}
			});
			// 我的页面是否显示商家端 167
			that.$Request.getT('/common/type/167').then(res => {
				if (res.code == 0) {
					if (res.data && res.data.value) {
						this.$queue.setData('shopIsEn', res.data.value);
					}
				}
			});
		},

		onShow: function() {
		},
		onHide: function() {}
	};
</script>

<style lang="scss">
	@import '@/static/css/colorui-main.css';
	@import '@/static/css/colorui-icon.css';
	@import '@/static/css/iconfont.css';
</style>
