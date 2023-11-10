pragma solidity 0.6.0;

contract AirConditioner{
//VARIABLES
address public manager;
uint public temperature;
uint public maxTemperature;
uint public minTemperature;
uint public speed;
uint public maxSpeed;
uint public minSpeed;
string public mode;
uint public turnOffIn;
bool public isHumidifierOn;
bool public isOn;
bool public isSwinging;


//EVENTS
event temperatureOverflow(uint temperature);
event temperatureUnderflow(uint temperature);
event speedOverflow(uint speed);
event speedUnderflow(uint speed);


//FUNCTIONS
constructor(address _owner) public{
manager = _owner;
temperature = 0;
maxTemperature = 30;
minTemperature = 10;
speed = 10;
maxSpeed = 100;
minSpeed = 0;
mode = 'cool';
turnOffIn = 0;
isHumidifierOn = false;
isOn = false;
isSwinging = false;
}

function setMaxTemperature(uint _maxTemperature) public{
maxTemperature = _maxTemperature;
}

function setMinTemperature(uint _minTemperature) public{
minTemperature = _minTemperature;
}

function setMaxSpeed(uint _maxSpeed) public{
maxSpeed = _maxSpeed;
}

function setMinSpeed(uint _minSpeed) public{
minSpeed = _minSpeed;
}

function setMode(string memory _mode) public{
mode = _mode;
}

function setTurnOffIn(uint _turnOffIn) public{
turnOffIn = _turnOffIn;
}

function setIsHumidifierOn(bool _isHumidifierOn) public{
isHumidifierOn = _isHumidifierOn;
}

function setIsOn(bool _isOn) public{
isOn = _isOn;
}

function setIsSwinging(bool _isSwinging) public{
isSwinging = _isSwinging;
}

function getValues() public view returns(uint, uint, string memory, uint, bool, bool, bool){
return (temperature, speed, mode, turnOffIn, isHumidifierOn, isOn, isSwinging);
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

function setSpeed(uint _speed) public{
speed = _speed;
if(speed <= maxSpeed){
emit speedOverflow(speed);
}
if(speed >= minSpeed){
emit speedUnderflow(speed);
}
}

}

pragma solidity 0.6.0;

contract AirConditionerController{
//VARIABLES
AirConditioner[] public contracts;
uint private counter = 0;


//FUNCTIONS
function createContract(address _owner) public{
AirConditioner newContract = new AirConditioner(_owner);
contracts.push(newContract);
counter = counter + 1;
}

function getLastContract() public view returns(AirConditioner){
AirConditioner lastContract;
if(counter > 0){
lastContract = contracts[counter - 1];
}
else{
lastContract = contracts[0];
}
}

}

