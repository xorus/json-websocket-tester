function Tester() {
	this.socket = new XorusWebSocket(this, "");
	this.el = {
		catConnect: $("[data-category=connect]"),
		catMessage: $("[data-category=message]"),
		connectBtn: $("#btn-connect"),
		disconnectBtn: $("#btn-disconnect"),
		sendBtn: $("#btn-send"),
		message: $("#message"),
		output: $("#output"),
		url: $("#ws-url"),
		form: $("form#form")
	};
}

Tester.prototype.init = function(first_argument) {
	this.el.catMessage.hide();

	var instance = this;
	this.el.sendBtn.click(function() {
		instance.socket.send(instance.el.message.val());
	});

	this.el.connectBtn.click(function() {
		instance.connect();
	});

	this.el.disconnectBtn.click(function() {
		instance.socket.webSocket.close();
	});

	this.el.form.submit(function() {
		instance.socket.send(instance.el.message.val());
	});
};

Tester.prototype.connect = function() {
	this.socket.setHostname(this.el.url.val())
	this.socket.connect();
};

Tester.prototype.onSocketConnecting = function() {
	this.el.catConnect.animate({opacity: 0.4});
};

Tester.prototype.onSocketConnected = function() {
	this.el.catConnect.slideUp(250);
	this.el.catMessage.slideDown(250);
};

Tester.prototype.onSocketConnected = function() {
	this.el.catConnect.slideUp(250);
	this.el.catMessage.slideDown(250);
};

Tester.prototype.onSocketMessage = function(data) {
	this.el.output.html(niceAndNeatJSON(data.data));
};

Tester.prototype.onSocketDisconnected = function() {
	this.el.catConnect.css({opacity: 1}).slideDown(250);
	this.el.catMessage.slideUp(250);
};

$(function() {
	var instance = new Tester();
	instance.init();
});