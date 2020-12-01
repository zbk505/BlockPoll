pragma solidity >=0.4.22 <0.7.0;

contract BlockPoll{
    
    struct Poll{
        bytes32[] choices;
        uint choicesCount;
        mapping(bytes32 => bool)  options;//maps
        mapping(bytes32 => uint8) votes;
        mapping(address => bool) voters;
       
    }
    
    Poll[] private activePolls;
    
      // Create new Poll and add it to activePolls 
    function addNewPoll(bytes32[] memory arr) public {
        activePolls.push(Poll(arr, arr.length));
    }
    
    //vote for a choice in a poll
    function vote(uint pollId, uint choiceId)public
    {
       activePolls[pollId].votes[activePolls[pollId].choices[choiceId]]++;
    }
    
    //returns the index of the poll with the highest votes in active polls
    function topPoll() public returns(uint){
        require(activePolls.length > 0, "No active Polls!");
        uint top;
        uint maxVotes = 0;
        
        for(uint i = 0; i < activePolls.length; i++)// loop through polls
        {
            uint votes = 0;
            
            Poll storage p = activePolls[i];
            for(uint j = 0; j < p.choices.length; j++)//loop through current polls choices
            {
                votes += p.votes[p.choices[j]];// add votes to total
            }
            if(votes > maxVotes)// compare to top, if great assign new top
            {
                top = i;
            }
        }
        return top;
    }
}