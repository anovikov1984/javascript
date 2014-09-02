// see currrent sockets using 'netstat -tonpc'
var Pubnub = require('../pubnub'),
    conf = {
      publish_key: 'demo',
      subscribe_key: 'demo'
    },
    i = 20,
    timeout = 501;

if (!Pubnub.keepAliveIsEmbedded()) {
  // use 3rd party package for node <= 0.11.12
  // package 'agentkeepalive' should be installed using "npm install agentkeepalive@0.2.2"
  console.log('using 3rd party package');
  conf.agent = require('agentkeepalive');
}

p = Pubnub.init(conf);

function publish(i) {
  p.publish({
    channel: 'somechannel',
    message: 'hey' + i,
    callback: function (result) {
      console.log(result);
    }
  });

  if (i-- !== 0) {
    setTimeout(function () {
      publish(i);
    }, timeout);
  }
}

publish(i);
