var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;

	// super-constructor
	instance_skel.apply(this, arguments);

	self.actions(); // export actions

	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;

	self.actions();
}

instance.prototype.init = function() {
	var self = this;

	self.status(self.STATE_OK);

	debug = self.debug;
	log = self.log;
}

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module requires that you have a working version of <a href="https://github.com/greghesp/assistant-relay">Google Assistant Relay</a>.</b>'
		},
		{
			type: 'dropdown',
			id: 'method',
			label: 'Method',
			width: 6,
			default: 'http',
			choices: [ { id: 'http', label: 'http' }, { id: 'https', label: 'https' } ]

		},
		{
			type: 'textinput',
			id: 'host',
			label: 'IP Address',
			width: 12
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Port',
			width: 6
		},
		{
			type: 'textinput',
			id: 'user',
			label: 'User (Created in your Assistant Relay config)',
			width: 12
		},

	]
}

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;
	debug("destroy");
}

instance.prototype.actions = function(system) {
	var self = this;

	self.setActions({
		'post': {
			label: 'Send Command',
			options: [
				{
					type: 'textinput',
					label: 'Command',
					id: 'command',
					default: ''
				},
				{
					type: 'checkbox',
					label: 'Broadcast',
					id: 'broadcast',
					inline: 'false'
				},
			]
		}
	});
}

instance.prototype.action = function(action) {
	var self = this;
	var cmd;

	cmd = self.config.host

	
	if (action.action == 'post') {

		var request = require('request');
		if (action.action == 'post') {
			var request = require('request');
			var options = {
			'method': 'POST',
			'url': self.config.method + '://' + self.config.host + ':' + self.config.port + '/assistant',
			'rejectUnauthorized': false,
			'headers': {
				'Content-Type': 'application/json'
			},
			'body': JSON.stringify({'user:': self.config.user , 
								  'command' : action.options.command , 
								  'broadcast' : action.options.broadcast
								})
							};
			request(options, function (error, response) {
				if (error) {
					self.log('error', 'Request failed (' + response.statusCode + ":" + response.statusMessage + ')');
					self.status(self.STATUS_ERROR, error);
				}
			});	
			}		
	}
	
}

instance_skel.extendedBy(instance);
exports = module.exports = instance;
