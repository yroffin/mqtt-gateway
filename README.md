# mqtt-gateway
Simple MQTT gateway

# setup

```
export GITHUB=$(curl -s https://github.com/yroffin/mqtt-gateway/releases/latest -s | cut -f2 -d\" | sed s:/tag/:/download/:)
sudo wget ${GITHUB}/mqtt-gateway-service -O /etc/init.d/mqtt-gateway-service
sudo useradd -m mqtt-gateway
sudo chmod 755 /etc/init.d/mqtt-gateway-service
sudo update-rc.d mqtt-gateway-service defaults

su - mqtt-gateway
export GITHUB=$(curl -s https://github.com/yroffin/mqtt-gateway/releases/latest -s | cut -f2 -d\" | sed s:/tag/:/download/:)
wget ${GITHUB}/mqtt-gateway.js
wget ${GITHUB}/package.json
npm install
exit

sudo service mqtt-gateway-service restart
sudo service mqtt-gateway-service status
```


Simply create an etc file name /etc/mqtt-gateway/mqtt-gateway.conf with this content

```
mqtt-gateway.rport=<port>
mqtt-gateway.rhost=<host-or-ip>
mqtt-gateway.rusername=<username>
mqtt-gateway.rpassword=<password>
mqtt-gateway.lport=<port>
mqtt-gateway.lhost=<host-or-ip>
mqtt-gateway.lusername=<username>
mqtt-gateway.lpassword=<password>
 ```
