/**
 * 
 * @author maxd
 * @date 2019.8.1
 */
module.exports = {
	//微信的appId
	getWxAppid() {
		return 'wxeaed7238f075ca19'
	},
	//全局邀请码
	getInvitation() {
		return uni.getStorageSync("publicRelation")
	},
	//获取APP下载地址
	getAppDownUrl() {
		return uni.getStorageSync("appurl")
	},
	//全局域名 部分html中需要单独替换 需要修改config中的网络请求域名
	publicYuMing() {
		return 'https://bwc.xianmxkj.com'
	},
	//全局域名 部分html中需要单独替换 需要修改config中的网络请求域名
	publicYuMingAll() {
		return 'https://bwc.xianmxkj.com/sqx_fast'
	},
	minMoney() {
		return uni.getStorageSync("minMoney") ? uni.getStorageSync("minMoney") : '0.3'
	},
	invitaionNum() {
		return uni.getStorageSync("invitaionNum")
	},
	maxMoney() {
		return uni.getStorageSync("maxMoney") ? uni.getStorageSync("maxMoney") : '0.7'
	},
	teamMoney() {
		return uni.getStorageSync("teamMoney")
	},
	logout() {
		this.remove("token");
		this.remove("userId");
		this.remove("mobile");
		this.remove("openid");
		this.remove("nickName");
		this.remove("relation");
		this.remove("avatar");
		this.remove("relation_id");
		this.remove("isInvitation");
		this.remove("member");
		this.remove("sex");
	},
	loginClear() {
		this.remove("token");
		this.remove("userId");
		this.remove("mobile");
		this.remove("nickName");
		this.remove("avatar");
		this.remove("relation_id");
		this.remove("isInvitation");
		this.remove("member");
		this.remove("sex");
	},
	showLoading(title) {
		uni.showLoading({
			title: title
		});
	},
	showToast(title) {
		uni.showToast({
			title: title,
			mask: false,
			duration: 4000,
			icon: "none"
		});
	},
	getSearchKeys: function(key) {
		let list = "套套，情趣用品，避孕，男用，女用，成人用品，保健品，冈本 杜蕾斯 杰士邦 第六感 倍力乐 诺丝 多乐士 斯香妮 双一 雨蝶 玛尼仕，充气娃娃，娃娃充气 阴蒂 刺激 超薄 螺纹 震动 润滑 女液体 延时 ";
		return list.includes(key);
	},
	setJson: function(key, value) {
		let jsonString = JSON.stringify(value);
		try {
			uni.setStorageSync(key, jsonString);
		} catch (e) {
			// error
		}
	},
	setData: function(key, value) {
		try {
			uni.setStorageSync(key, value);
		} catch (e) {
			// error
		}
	},
	getData: function(key) {
		try {
			const value = uni.getStorageSync(key);
			if (value) {
				return value;
			}
		} catch (e) {
			// error
		}

	},
	getJson: function(key) {
		try {
			const value = uni.getStorageSync(key);
			if (value) {
				return JSON.parse(value);
			}
		} catch (e) {
			// error
		}

	},
	clear: function() {
		uni.clearStorage();
	},
	get: function(key) { //获取队列里面全部的数据
		let data = this.getJson(key);
		if (data instanceof Array) {
			return data;
		}
		return [];
	},
	insert: function(param) { //队列插入数据
		param.capacityNum = param.capacityNum || 100; //队列容量 默认队列中超过100条数据，自动删除尾部
		let data = this.getJson(param.key);
		if (data instanceof Array) {
			if (data.length > param.capacityNum) {
				let total = data.length - param.capacityNum;
				for (let i = 0; i < total; i++) {
					data.pop();
				}
			}
			data.unshift(param.value);
		} else {
			data = [];
			data.push(param.value);
		}
		this.setJson(param.key, data);
	},
	removeItem: function(key, itemIds) { //提供itemIds数组 批量删除队列中的某项数据
		let data = this.getJson(key);
		if (data instanceof Array) {
			for (let i = 0; i < itemIds.length; i++) {
				for (let p = 0; p < data.length; p++) {
					if (itemIds[i] === data[p].itemid) {
						data.splice(p, 1);
						break;
					}
				}
			}
			this.setJson(key, data);
		}
	},
	isExist: function(key, itemId) { //检测某条数据在队列中是否存在
		let data = this.getJson(key);
		if (data instanceof Array) {
			for (let p = 0; p < data.length; p++) {
				if (itemId === data[p].itemid) {
					return true;
				}
			}
		}
		return false;
	},
	isExistPdd: function(key, itemId) { //检测某条数据在队列中是否存在
		let data = this.getJson(key);
		if (data instanceof Array) {
			for (let p = 0; p < data.length; p++) {
				if (itemId === data[p].goodsId) {
					return true;
				}
			}
		}
		return false;
	},
	isExistJd: function(key, itemId) { //检测某条数据在队列中是否存在
		let data = this.getJson(key);
		if (data instanceof Array) {
			for (let p = 0; p < data.length; p++) {
				if (itemId === data[p].skuId) {
					return true;
				}
			}
		}
		return false;
	},
	remove: function(key) { //删除某条队列
		try {
			uni.removeStorageSync(key);
			//localStorage.removeItem(key)
		} catch (e) {
			// error
		}
	},
	getCount: function(key) { //获取队列中全部数据数量

		let data = this.getJson(key);
		if (data instanceof Array) {
			return data.length;
		}
		return 0;
	},
};
