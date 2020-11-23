pragma solidity >=0.4.22 <0.7.0;


contract BlockPoll{

    struct Option{
     uint id; 
     string name;
     uint voteCount;
    }

    // Keep track of how many options to vote for 
    mapping(uint => Option) public options;
    // Keep track of users that have voted 
    mapping(address => bool) public voters;

    uint winner;
    Option[] private activePolls;

    // store options count 
    uint public optionsCount;

    //voted event 
    event votedEvent (
        uint indexed _optionId
        );
    // add numbers of options into the polls 
    function Poll() public {
        addOption("Option 1");
        addOption("Option 2");
        addOption("Option 3");
        addOption("Option 4");
        addOption("Option 5");
        addOption("Option 6");
    }



    function addOption(string _name) private {
        optionsCount++;
        options[optionsCount] = Option(optionsCount, _name, 0);
    }


    function vote(uint _optionId) public {
        // make sure that the voters haven't voted yet 
        require(!voters[msg.sender], "User cannot vote in a poll more than once!");
        // make sure that the voters are voting for the avilable options 
        require(_optionId > 0 && _optionId <= optionsCount, "Not an Option");

        // make sure the voter has actually voted 
        voters[msg.sender] = true;

        // the update on the votes 
        options[_optionId].voteCount++;
        emit votedEvent(_optionId);
    }