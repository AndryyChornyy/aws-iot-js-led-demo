
//import required modules

var awsIot = require('aws-iot-device-sdk');
var rpio = require('rpio');

//initialize GPIO18 to low
rpio.open(12, rpio.OUTPUT, rpio.LOW);

//setup paths to certificates
var device = awsIot.device({
   keyPath: '../certs/private.pem.key',
  certPath: '../certs/certificate.pem.crt',
    caPath: '../certs/caCert.crt',
  clientId: 'MyThingName',
    region: 'us-east-2',
   host: <YOUR_AWS_IOT_ENDPOINT>
});

device
  .on('connect', function() {

    //subscribe to the LED topic
    device.subscribe('LED');

    });

device
  .on('message', function(topic, payload) {

    // convert the payload to a JSON object
    var payload = JSON.parse(payload.toString());

    console.log(payload.light);

    //check for TOPIC name
    if(topic == 'LED'){

        if(payload.light == 'on'){

          rpio.write(12, rpio.HIGH);

        } else {

          rpio.write(12, rpio.LOW);

        }
    }

  });
