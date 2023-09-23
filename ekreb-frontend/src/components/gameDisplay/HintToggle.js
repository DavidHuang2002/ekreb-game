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
  const handleChange = () => {
    console.log("toggle");
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
    if(onlyFirstLetterRevealed(hint)){
      return `the word starts with the letter ${hint[0]}`
    } else {
      return `the word is in the format of ${hint.replaceAll("_", " _ ")}`
    }
  }

  return (
    <Collapse 
      ghost 
      onChange={()=>{handleChange()}}
    >
      <Panel header="Wanna some hint?" key="1">
        <p>{displayHint(hint)}</p>
        
        <Link onClick={()=>{handleMoreHint()}}>I'm stuck! More hints please!</Link>
      </Panel>
    </Collapse>
  );
} 

const mapStateToProps = (state) => ({
  hint: state.game.hint,
});
  
export default connect(mapStateToProps)(HintToggle);
