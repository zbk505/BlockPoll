pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

contract BlockPoll{
    
    struct Poll{
        string[] choices;
        uint choicesCount;
        string PollName;
        mapping(bytes32 => uint8) votes;
        mapping(address => bool) voters;
       
    }
    
    Poll[] public activePolls;
    
      // Create new Poll and add it to activePolls 
    function addNewPoll(string[] memory arr, string memory PollName) public {
        activePolls.push(Poll(arr, arr.length, PollName));
    }
    
    //vote for a choice in a poll
   function getVotes(uint pollid, uint choiceid) public returns(uint)
    {
        uint votes = activePolls[pollid].votes[stringToBytes32(activePolls[pollid].choices[choiceid])];
        return votes;
    }
    
   function vote(uint pollId, uint choiceId)public
    {
       activePolls[pollId].votes[stringToBytes32(activePolls[pollId].choices[choiceId])]++;
    }
    
    //returns the index of the poll with the highest votes in active polls
    function topPoll() public returns(uint256){
        require(activePolls.length > 0, "No active Polls!");
        uint256 top = 0;
        uint maxVotes = 0;
        
        for(uint i = 0; i < activePolls.length; i++)// loop through polls
        {
            uint votes = 0;
            
            Poll storage p = activePolls[i];
            for(uint j = 0; j < p.choices.length; j++)//loop through current polls choices
            {
                votes += p.votes[stringToBytes32(p.choices[j])];// add votes to total
            }
            if(votes > maxVotes)// compare to top, if great assign new top
            {
                top = i;
            }
        }
        return top;
    }
    function getPoll(uint pollid)public returns (string memory)
    {
        require(stringToBytes32(activePolls[pollid].PollName).length >=1,"Poll does not exist");
        
        string memory ret=  activePolls[pollid].PollName;
        return ret;
    }
    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
    
        assembly {
            result := mload(add(source, 32))
        }
    }
}
