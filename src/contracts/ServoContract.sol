pragma solidity 0.6.0;

contract ServoMotor{
//VARIABLES
address public manager;
uint public position;
uint public maxPosition;
uint public minPosition;
uint public speed;
uint public maxSpeed;
uint public minSpeed;
bool public isMoving;
uint public torque;


//EVENTS
event positionOverflow(uint position);
event positionUnderflow(uint position);
event speedOverflow(uint speed);
event speedUnderflow(uint speed);


//FUNCTIONS
constructor(address _owner) public{
manager = _owner;
position = 0;
maxPosition = 180;
minPosition = 0;
speed = 10;
maxSpeed = 255;
minSpeed = 0;
isMoving = false;
torque = 4;
}

function setMaxPosition(uint _maxPosition) public{
maxPosition = _maxPosition;
}

function setMinPosition(uint _minPosition) public{
minPosition = _minPosition;
}

function setMaxSpeed(uint _maxSpeed) public{
maxSpeed = _maxSpeed;
}

function setMinSpeed(uint _minSpeed) public{
minSpeed = _minSpeed;
}

function setIsMoving(bool _isMoving) public{
isMoving = _isMoving;
}

function setTorque(uint _torque) public{
torque = _torque;
}

function getValues() public view returns(uint, uint, bool, uint){
return (position, speed, isMoving, torque);
}

function setPosition(uint _position) public{
position = _position;
if(position <= maxPosition){
emit positionOverflow(position);
}
if(position >= minPosition){
emit positionUnderflow(position);
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

contract ServoMotorController{
//VARIABLES
ServoMotor[] public contracts;
uint private counter = 0;


//FUNCTIONS
function createContract(address _owner) public{
ServoMotor newContract = new ServoMotor(_owner);
contracts.push(newContract);
counter = counter + 1;
}

function getLastContract() public view returns(ServoMotor){
ServoMotor lastContract;
if(counter > 0){
lastContract = contracts[counter - 1];
}
else{
lastContract = contracts[0];
}
}

}

