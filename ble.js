var myDevice;
var myService = 0xfff0;        // fill in a service you're looking for here
var myCharacteristic = 0xfff6;   // fill in a characteristic from the service here

function connect(){
  // Validate services UUID entered by user first.
  let optionalServices = document.querySelector('#optionalServices').value
    .split(/, ?/).map(s => s.startsWith('0x') ? parseInt(s) : s)
    .filter(s => s && BluetoothUUID.getService);

  console.log('Requesting any Bluetooth Device...');
  navigator.bluetooth.requestDevice({
    // filters: [...] <- Prefer filters to save energy & show relevant devices.
    acceptAllDevices: true
    //optionalServices: optionalServices
  })
  .then(device => {
    console.log('Connecting to GATT Server...');
    return device.gatt.connect();
  })
  .then(server => {
    // Note that we could also get all services that match a specific UUID by
    // passing it to getPrimaryServices().
    console.log('Getting Services...');
    return server.getPrimaryServices();
  })
  .then(services => {
    console.log('Getting Characteristics...');
    let queue = Promise.resolve();
    services.forEach(service => {
      queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
        console.log('> Service: ' + service.uuid);
        characteristics.forEach(characteristic => {
        console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
                getSupportedProperties(characteristic));
        });
      }));
    });
    return queue;
  })
  .catch(error => {
    console.log('Argh! ' + error);
  });
}
  
/* Utils */
  
function getSupportedProperties(characteristic) {
  let supportedProperties = [];
  for (const p in characteristic.properties) {
    if (characteristic.properties[p] === true) {
        supportedProperties.push(p.toUpperCase());
    }
  }
  return '[' + supportedProperties.join(', ') + ']';
}

// subscribe to changes from the meter:
function subscribeToChanges(characteristic) {
  characteristic.oncharacteristicvaluechanged = handleData;
}

// handle incoming data:
function handleData(event) {
  // get the data buffer from the meter:
  var buf = new Uint8Array(event.target.value);
  console.log(buf);
}

// disconnect function:
function disconnect() {
  if (myDevice) {
    // disconnect:
    myDevice.gatt.disconnect();
    console.log('Disconnected')
  }
}