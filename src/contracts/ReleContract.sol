pragma solidity 0.6.0;

contract Rele{
//VARIABLES
address public manager;
bool public status;


//FUNCTIONS
constructor(address _owner) public{
manager = _owner;
status = false;
}

function setStatus(bool _status) public{
status = _status;
}

function getValues() public view returns(bool){
return (status);
}

}

pragma solidity 0.6.0;

contract ReleController{
//VARIABLES
Rele[] public contracts;
uint private counter = 0;


//FUNCTIONS
function createContract(address _owner) public{
Rele newContract = new Rele(_owner);
contracts.push(newContract);
counter = counter + 1;
}

function getLastContract() public view returns(Rele){
Rele lastContract;
if(counter > 0){
lastContract = contracts[counter - 1];
}
else{
lastContract = contracts[0];
}
}

}

