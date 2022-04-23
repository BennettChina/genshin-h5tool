import axios from "axios";
import bot from "ROOT";
import { scheduledJobs, scheduleJob } from "node-schedule";

const API = {
	e20220415travel: "https://hk4e-api.mihoyo.com/event/e20220422travel/bbs/index"
}

const HEADERS = {
	Origin: "https://webstatic.mihoyo.com",
	Referer: "https://webstatic.mihoyo.com/",
	"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"
}

export const getInfo: ( user_id: number, uid: string, region: string, cookie: string ) => Promise<string> =
	async ( user_id, uid, region, cookie ) => {
		return new Promise( ( resolve, reject ) => {
			axios.get( API.e20220415travel, {
				params: {
					uid,
					region,
					lang: "zh-cn",
					channel: 0
				},
				headers: {
					...HEADERS,
					"Cookie": cookie
				}
			} ).then( r => {
				if ( r.status !== 200 ) {
					reject( `获取H5数据失败, reason: ${ r.statusText }` );
					return;
				}
				
				if ( r.data.retcode !== 0 ) {
					reject( `获取H5数据失败, reason: ${ r.data.message }` );
					return;
				}
				
				let {
					outgoing_info: { interval, status },
					animal: { start_time, end_time, has_award, award_num },
					now
				}: {
					outgoing_info: { interval: number, status: string },
					animal: { start_time: number, end_time: number, has_award: boolean, award_num: number },
					now: number
				} = r.data.data;
				
				if ( status === 'OS_NONE' ) {
					resolve( '可莉今天已经玩累了，请明天再来哦！' )
					return;
				}
				
				let back_time = interval + now;
				let sys_time_now = Date.now();
				back_time = back_time * 1000;
				if ( sys_time_now > back_time ) {
					// 已经回来了
					resolve( `可莉已经游玩回来了哦，快去获取您的奖励吧!` );
					return;
				}
				
				let data = `可莉将在${ new Date( back_time ).toLocaleTimeString() }游玩回来。`;
				if ( !has_award ) {
					start_time = start_time * 1000;
					end_time = end_time * 1000;
					if ( sys_time_now < start_time ) {
						// 动物还没来
						data = `动物将在${ new Date( start_time ).toLocaleTimeString() }～${ new Date( end_time ).toLocaleTimeString() }来访，请及时收取奖励(${ award_num }摩拉)。\n` + data;
						if ( !scheduledJobs[`e20220415travel-animal-${ uid }`] ) {
							// 如果定时任务已经有了就不再设置
							scheduleJob( `e20220415travel-animal-${ uid }`, new Date( start_time ), () => {
								bot.client.sendPrivateMsg( user_id, `动物已经来了，将在${ new Date( end_time ).toLocaleTimeString() }结束来访，请及时收取奖励(${ award_num }摩拉)。` );
							} )
						}
					}else if ( sys_time_now < end_time ) {
						// 动物已经来了
						data = `动物将在${ new Date( end_time ).toLocaleTimeString() }结束来访，请及时收取奖励(${ award_num }摩拉)。\n` + data;
					} else {
						// do nothing
					}
				}
				
				if ( !scheduledJobs[`e20220415travel-klee-${ uid }`] ) {
					// 如果定时任务已经有了就不再设置
					scheduleJob( `e20220415travel-klee-${ uid }`, new Date( back_time ), () => {
						bot.client.sendPrivateMsg( user_id, `可莉已经游玩回来了哦，快去获取您的奖励吧!` );
					} )
				}
				
				resolve( data );
			} ).catch( reason => reject( reason ) )
		} );
	}