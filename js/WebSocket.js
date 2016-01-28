/**
 * Websocket service
 * Created by Xorus on 11/05/15.
 */

function XorusWebSocket(listenerInstance, hostname) {
    this.hostname = hostname;
    this.listenerInstance = listenerInstance;
    this.retryDelay = 5000;
}

XorusWebSocket.prototype.setHostname = function(hostname) {
    this.hostname = hostname;
};

XorusWebSocket.prototype.connect = function() {
	var instance = this;

    this.listenerInstance.onSocketConnecting();
    this.webSocket = new WebSocket(this.hostname);
    this.webSocket.onopen = function(msg) { instance.onOpen() };
    this.webSocket.onclose = function(msg) { instance.onClose() };
    this.webSocket.onmessage = function(msg) { instance.onMessage(msg) };
}

XorusWebSocket.prototype.onOpen = function() {
	console.info("Websocket connected");
    this.listenerInstance.onSocketConnected();
};

XorusWebSocket.prototype.onClose = function() {
    var instance = this;

	console.info("Websocket disconnected");
    this.listenerInstance.onSocketDisconnected("Connection retry in " + (this.retryDelay / 1000) + " seconds...");

    setTimeout(function() {
        instance.connect();
    }, this.retryDelay);

    var delay = this.retryDelay - 1000;
    var a = function() {
        instance.listenerInstance.onSocketDisconnected("Connection retry in " + (delay / 1000) + " seconds...");
        if(delay > 1000) {
            delay -= 1000;
            setTimeout(a, 1000);
        }
    }
    setTimeout(a, 1000);
};

XorusWebSocket.prototype.onMessage = function(message) {
	this.listenerInstance.onSocketMessage(message);
};

XorusWebSocket.prototype.send = function(message) {
    console.debug("sending : " + message);
    this.webSocket.send(message);
};