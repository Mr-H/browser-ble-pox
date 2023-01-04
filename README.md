# browser-ble-pox
 
Browser Experimental BLE capabilities connecting to $10 Pulse Oximeter

I am using a $10 Pulse Oximeter from LPOW that I got from Amazon but the origin is China.  It seems to be following the BLE GATT specification but does not seem to be attempting to correctly identify itself.  

The device BLE device pattern is FF:FF:FF:FF:39:60 its name is null but description is FSRK-sample-001

I am attempting to connect to the device with the experimental BLE Browser support available in Chrome.  To enable these you need to go to chrome://flags and enamble Experimental Web Platform features, then relaunch.  (I believe other browsers also have some support but the enablement process is going to be different)

Once enabled go to the available examples to test the connection works 
https://googlechrome.github.io/samples/web-bluetooth/index.html

When a pair and connect to the device (https://googlechrome.github.io/samples/web-bluetooth/watch-advertisements.html) I get the name null and the id NAcbPscQejjhjX7lZ+HXaQ== I am assuming this is a unique reference to my specific device and it will be different for each one.

If I pull the device up in LiteBlue is can subscribe to the data feed (no ack) on Service UUID: 0000fff6-0000-1000-8000-00805f9b34fb


