import { Collapse, Typography } from 'antd';
import React from 'react';
import { connect } from 'dva';
const { Panel } = Collapse;
const {Link } = Typography;

const onlyFirstLetterRevealed = hint => {
  if(!hint) return false;

  const revealedPart = hint.replaceAll("_", "")
  if(revealedPart.length == 1
    && revealedPart == hint[0]){
    return true;
  }

  return false;
}

const HintToggle = ({hint, dispatch}) =>{
  const handleChange = keys => {
    // do nothing when it is just collapsing down to avoid accidental hint between two rounds of game
    const isCollapseDown = keys.length == 0;
    if(isCollapseDown) return;

    console.log("toggle");
    
    // if we already have hint then do nothing, the logic for more hint is handled by the link
    if(hint) return;

    dispatch({
      type: 'game/getHint',
    })
  }

  const handleMoreHint = () => {
    dispatch({
      type: 'game/getHint',
    })
  }

  const displayHint = () => {
    if(!hint || hint == "") return "";
    if(onlyFirstLetterRevealed(hint)){
      return `ok, listen up, the word starts with the letter ${hint[0]}`
    } else {
      return `the word is in the format of ${hint.replaceAll("_", " _ ")}`
    }
  }

  return (
    <Collapse 
      ghost 
      onChange={(keys)=>{handleChange(keys)}}
    >
      <Panel header="beg me, and maybe I will give you some hints" key="1">
        <p>{displayHint(hint)}</p>
        
        <Link onClick={()=>{handleMoreHint()}}>I'm stuck! I can't play without hints! Give me more please!</Link>
      </Panel>
    </Collapse>
  );
} 

const mapStateToProps = (state) => ({
  hint: state.game.hint,
});
  
export default connect(mapStateToProps)(HintToggle);
