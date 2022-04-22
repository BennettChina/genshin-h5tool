import { PluginSetting } from "@modules/plugin";
import { OrderConfig } from "@modules/command";
import { MessageScope } from "@modules/message";
import { AuthLevel } from "@modules/management/auth";

const getH5: OrderConfig = {
	type: "order",
	cmdKey: "genshin-h5tool.get-h5",
	desc: [ "查看可莉出游结束时间", "" ],
	headers: [ "geth5" ],
	regexps: [ "" ],
	scope: MessageScope.Private,
	auth: AuthLevel.User,
	main: "index",
	detail: "查看可莉出游结束时间，并将通过QQ通知你。"
};


// 不可 default 导出，函数名固定
export async function init(): Promise<PluginSetting> {
	return {
		pluginName: "genshin-h5tool",
		cfgList: [ getH5 ]
	};
}