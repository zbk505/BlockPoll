pragma solidity >=0.4.22 <0.7.0;

contract BlockPoll{
    
    struct Poll{
        bytes32[] choices;
        mapping(bytes32 => bool)  options;//maps
        
        mapping(bytes32 => uint8) votes;
        mapping(address => bool) voters;
        bytes32 winner;
    }
    
    Poll[] private activePolls;
    // store votes count
    uint public votesCount;
    
    // store options count
    uint public optionsCount;
    
    //voted event 
    event votedEvent (
        uint indexed _voterID
        );
        
      // add numbers of options into the polls 
    function Polls() public {
        addOption("Option 1");
        addOption("Option 2");
        addOption("Option 3");
        addOption("Option 4");
        addOption("Option 5");
        addOption("Option 6");
    }
    
  function addOption(string _name) private {
        optionsCount++;
        voters[optionsCount] = voters(optionsCount, _name, 0);
    }
    
    function vote(uint pollId, bytes32 choice)public
    {
        Poll storage poll = activePolls[pollId];
        require(!poll.voters[msg.sender], "User cannot vote in a poll more than once!");
                // make sure that the voters are voting for the avilable options 
        require(pollId > 0 && pollId <= optionsCount, "Not an Option");
        
        poll.voters[msg.sender] = true;
        poll.votes[choice] = poll.votes[choice] + 1;
    }
    
    function createPoll(bytes32[] memory options) public{
        Poll memory p = Poll(options, "");
        activePolls.push(p);
    }
    
    function decideWinner(uint pollId) public{
        uint highest = 0;// option with highest votes
        Poll storage poll = activePolls[pollId];
        
        for(uint i = 0; i < poll.choices.length; i++)// iterate through number of choices
        {
            uint  num = poll.votes[poll.choices[i]];// number of votes for choice
            
            if(num > highest)// if current number of votes is larger than the most, make it the winner
            {
                poll.winner = poll.choices[i];
                highest = num;
            }
        }
        activePolls[pollId] = poll;
    }
