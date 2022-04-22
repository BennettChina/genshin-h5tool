import { InputParameter } from "@modules/command";
import { Private } from "#genshin/module/private/main";
import { privateClass } from "#genshin/init";
import { getInfo } from "#genshin-h5tool/util/api";

export async function main( { messageData, sendMessage }: InputParameter ): Promise<void> {
	const userID: number = messageData.user_id;
	const serID: number = parseInt( messageData.raw_message ) || 1;
	const single: Private | string = await privateClass.getSinglePrivate( userID, serID );
	
	if ( typeof single === "string" ) {
		await sendMessage( single );
	} else {
		const { uid, server, cookie } = single.setting;
		const ret = await getInfo( userID, uid, server, cookie );
		await sendMessage( ret );
	}
}