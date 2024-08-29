// import type { HelixEventSubSubscription } from '@twurple/api';
// import { rtfm } from '@twurple/common';
// import { EventSubChannelModerateEvent } from '../events/EventSubChannelModerateEvent';
// import type { EventSubChannelModerateEventData } from '../events/EventSubChannelModerateEvent.external';
// import type { EventSubBase } from '../EventSubBase';
// import { EventSubSubscription } from './EventSubSubscription';
//
// /** @internal */
// @rtfm('eventsub-base', 'EventSubSubscription')
// export class EventSubChannelModerateSubscription extends EventSubSubscription<EventSubChannelModerateEvent> {
// 	/** @protected */ readonly _cliName = 'channel.moderate';
//
// 	constructor(
// 		handler: (data: EventSubChannelModerateEvent) => void,
// 		client: EventSubBase,
// 		private readonly _broadcasterId: string,
// 		private readonly _userId: string,
// 	) {
// 		super(handler, client);
// 	}
//
// 	get id(): string {
// 		return `channel.moderate.${this._broadcasterId}.${this._userId}`;
// 	}
//
// 	get authUserId(): string | null {
// 		return this._userId;
// 	}
//
// 	protected transformData(
// 		data: EventSubChannelModerateEventData,
// 	): EventSubChannelModerateEvent {
// 		return new EventSubChannelModerateEvent(data, this._client._apiClient);
// 	}
//
// 	protected async _subscribe(): Promise<HelixEventSubSubscription> {
// 		return await this._client._apiClient.asUser(
// 			this._userId,
// 			async ctx =>
// 				await ctx.eventSub.subscribeToChannelModerateEvents(
// 					this._broadcasterId,
// 					await this._getTransportOptions(),
// 				),
// 		);
// 	}
// }
