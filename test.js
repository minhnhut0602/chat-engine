"use strict";

var typingIndicator = require('./plugins/typingIndicator.js');
var append1 = require('./plugins/append1.js');
var append2 = require('./plugins/append2.js');
var append3 = require('./plugins/append3.js');

var OCFBuilder = require('./src/index.js'); 

var OCF = new OCFBuilder({
    globalConfigs: 'here'
}, [
    new typingIndicator({
        timeout: 5000
    }),
    new append1(),
    new append2(),
    new append3(),
]);

let me = new OCF.User('ian', {value: true});

let john = new OCF.User('john', {value: true});
let mary = new OCF.User('mary', {value: true});

var chat = me.createChat([john, mary]);

chat.emitter.on('message', (payload) => {
    console.log('got message', payload.sender, payload.data);
});

chat.emitter.on('startTyping', (payload) => {
    console.log('start typing', payload.sender, payload.data);
});

chat.emitter.on('stopTyping', (payload) => {
    console.log('stop typing', payload.sender, payload.data);
});

chat.emitter.on('ready', () => {

    console.log('chat is ready');

    chat.typing.startTyping();

    chat.publish('message', {
        text: 'hello world'
    });

});
