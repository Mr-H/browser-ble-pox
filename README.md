# browser-ble-pox
 
Browser Experimental BLE capabilities connecting to $10 Pulse Oximeter

I am using a $10 Pulse Oximeter from LPOW that I got from Amazon but the origin is China.  It seems to be following the BLE GATT specification but does not seem to be attempting to correctly identify itself.  

The device BLE device pattern is FF:FF:FF:FF:39:60 its name is null but description is FSRK-sample-001

I am attempting to connect to the device with the experimental BLE Browser support available in Chrome.  To enable these you need to go to chrome://flags and enamble Experimental Web Platform features, then relaunch.  (I believe other browsers also have some support but the enablement process is going to be different)

Once enabled go to the available examples to test the connection works 
https://googlechrome.github.io/samples/web-bluetooth/index.html

When a pair and connect to the device (https://googlechrome.github.io/samples/web-bluetooth/watch-advertisements.html) I get the name null and the id NAcbPscQejjhjX7lZ+HXaQ== I am assuming this is a unique reference to my specific device and it will be different for each one.

If I pull the device up in LightBlue is can subscribe to the data feed (no ack) on Service UUID: 0000fff6-0000-1000-8000-00805f9b34fb


https://novelbits.io/bluetooth-gatt-services-characteristics/

From this site:
The only restriction for choosing UUIDs for custom services and characteristics is that they must not collide with the Bluetooth SIG base UUID: XXXXXXXX-0000-1000-8000-00805F9B34FB

Using the Chrome Bluetooth internals chrome://bluetooth-internals I can connect the device and inspect the available services

Name: FSRK-sample-001

Address: FF:FF:FF:FF:39:60

GATT Connected: Connected

Latest RSSI: -127

Services:
* 00001800-0000-1000-8000-00805f9b34fb  // Generic Access Service UUID
* 00001801-0000-1000-8000-00805f9b34fb  // Generic Attribute Service UUID
* 0000180a-0000-1000-8000-00805f9b34fb  // Device Information Service but returns an error
* 0000fff0-0000-1000-8000-00805f9b34fb  // ??? Subscription Stream
* 18424398-7cbc-11e9-8f9e-2a86e4085a59  // Custom service so this may warrent further investigation 

Manufacturer Data: 0xabcd 0x0a00

### Service: 0000fff0-0000-1000-8000-00805f9b34fb
  
####  Service Info
  
* ID: FF:FF:FF:FF:39:60/0000fff0-0000-1000-8000-00805f9b34fb_000a
* UUID: 0000fff0-0000-1000-8000-00805f9b34fb
* Type: Primary
  
#### Characteristics
  
* Characteristic: 0000fff6-0000-1000-8000-00805f9b34fb  // This one does have a read subscribable stream   
* Characteristic: 0000fff7-0000-1000-8000-00805f9b34fb  // This one supports a write but its not clear what codes may do anything

### Service: 00001801-0000-1000-8000-00805f9b34fb  // I think this one is general attribute 

#### Service Info

* ID: FF:FF:FF:FF:39:60/00001801-0000-1000-8000-00805f9b34fb_0006
* UUID: 00001801-0000-1000-8000-00805f9b34fb
* Type: Primary

#### Characteristics

* Characteristic: 00002a05-0000-1000-8000-00805f9b34fb  // Service changed, always 0x0100FFFF this may be battery because it never changes but does have a value on read.

### Service: 00001800-0000-1000-8000-00805f9b34fb  // I think this one is general access 

#### Service Info

* ID: FF:FF:FF:FF:39:60/00001800-0000-1000-8000-00805f9b34fb_0001
* UUID: 00001800-0000-1000-8000-00805f9b34fb
* Type: Primary

#### Characteristics

* Characteristic: 00002a00-0000-1000-8000-00805f9b34fb  // I think this one is device name, always FSRK-sample-001
* Characteristic: 00002a01-0000-1000-8000-00805f9b34fb  // I think this one is appearance, always 0x0000 


** It looks like we should be looking for 0x1822, // < Pulse Oximeter Service UUID **


Primary Service ID list - https://btprodspecificationrefs.blob.core.windows.net/assigned-values/16-bit%20UUID%20Numbers%20Document.pdf

This test is interesting 
https://googlechrome.github.io/samples/web-bluetooth/notifications.html?characteristic=0x0000fff6-0000-1000-8000-00805f9b34fb&service=0x0000fff0-0000-1000-8000-00805f9b34fb


