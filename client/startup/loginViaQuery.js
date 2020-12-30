import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

Meteor.startup(() => {
	if (FlowRouter.getQueryParam('resumeToken')) {
		// console.debug('[Rocket.Chat]', 'Found resumeToken.')
		const navigate = () => {
			if (FlowRouter.getQueryParam('goto')) {
				// console.debug('[Rocket.Chat]', 'Found goto parameter.')
				FlowRouter.go(decodeURIComponent(FlowRouter.getQueryParam('goto')));
			} else {
				FlowRouter.go('/channel/general');
			}
		}
		if (!Meteor.userId()) {
			// console.debug('[Rocket.Chat]', 'No userId, will login.')
			Meteor.loginWithToken(FlowRouter.getQueryParam('resumeToken'), () => {
				// console.debug('[Rocket.Chat]', 'Entered login callback.')
				navigate();
			});
		} else {
			// console.debug('[Rocket.Chat]', 'UserId exists, ignoring resumeToken.')
			navigate();
		}
	}
});
