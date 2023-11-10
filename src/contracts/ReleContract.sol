pragma solidity 0.6.0;

contract DHT11{
//VARIABLES
address public manager;
uint public temperature;
uint public maxTemperature;
uint public minTemperature;
uint public humidity;
uint public maxHumidity;
uint public minHumidity;


//EVENTS
event temperatureOverflow(uint temperature);
event temperatureUnderflow(uint temperature);
event humidityOverflow(uint humidity);
event humidityUnderflow(uint humidity);


//FUNCTIONS
constructor(address _owner) public{
manager = _owner;
maxTemperature = 10;
minTemperature = 0;
maxHumidity = 10;
minHumidity = 0;
}

function setMaxTemperature(uint _maxTemperature) public{
maxTemperature = _maxTemperature;
}

function setMinTemperature(uint _minTemperature) public{
minTemperature = _minTemperature;
}

function setMaxHumidity(uint _maxHumidity) public{
maxHumidity = _maxHumidity;
}

function setMinHumidity(uint _minHumidity) public{
minHumidity = _minHumidity;
}

function getValues() public view returns(uint, uint){
return (temperature, humidity);
}

function setTemperature(uint _temperature) public{
temperature = _temperature;
if(temperature <= maxTemperature){
emit temperatureOverflow(temperature);
}
if(temperature >= minTemperature){
emit temperatureUnderflow(temperature);
}
}

function setHumidity(uint _humidity) public{
humidity = _humidity;
if(humidity <= maxHumidity){
emit humidityOverflow(humidity);
}
if(humidity >= minHumidity){
emit humidityUnderflow(humidity);
}
}

}

pragma solidity 0.6.0;

contract DHT11Controller{
//VARIABLES
DHT11[] public contracts;
uint private counter = 0;


//FUNCTIONS
function createContract(address _owner) public{
DHT11 newContract = new DHT11(_owner);
contracts.push(newContract);
counter = counter + 1;
}

function getLastContract() public view returns(DHT11){
DHT11 lastContract;
if(counter > 0){
lastContract = contracts[counter - 1];
}
else{
lastContract = contracts[0];
}
}

}

