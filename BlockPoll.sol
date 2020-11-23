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
    
    function vote(uint pollId, bytes32 choice)public
    {
        Poll storage poll = activePolls[pollId];
        require(!poll.voters[msg.sender], "User cannot vote in a poll more than once!");
        
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
}