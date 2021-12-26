import React,{useReducer} from 'react';
import DigiButton from './DigiButton';
import OperaButton from './OperaButton';
import "./style.css";

export  const ACTIONS ={
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: "delete-digit",
  EVALUATE: 'evaluate',
  CLEAR: 'clear',
};

function reducer( state ,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(payload.digit === "0" && state.currentOperand === "0" ) return state;
      if(payload.digit === "." && state.currentOperand === ".") return state;
    
      return{
        ...state ,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
      case ACTIONS.CHOOSE_OPERATION:
        if(state.currentOperand == null && state.previousOperand == null) {
          return state;
        }
          if(state.previousOperand == null){
          return{
            ...state , 
            operation : payload.operation,
            previousOperand : state.currentOperand,
            currentOperand : null,
          }}
          return{
            ...state,
            previousOperand : evaluate(state),
            operation : payload.operation,
            currentOperation : null
          }

     
       case ACTIONS.EVALUATE:
        
         return{
          
           currentOperand: evaluate(state),
           previousOperand:null,
           operation:null,
         }

       
         case ACTIONS.CLEAR:
           return{
             
           }

  }

}
function evaluate ({currentOperand,previousOperand,operation})
{

  const current =parseFloat(currentOperand);
  const prev = parseFloat(previousOperand);
  if( isNaN(prev) || isNaN(current)) return ""
  let computation =""
   switch (operation) {
     case "+":
       computation = prev + current;
       break;
       case "-":
       computation = prev - current;
       break;
       case "*":
       computation = prev * current;
       break;
       case "÷":
       computation = prev / current;
       break;
       case "":
       computation = prev + current;
       break;
   }
  
return computation.toString()
}
function App() {

  const [{currentOperand,previousOperand,operation},dispatch] = useReducer(reducer,{});
return (
    <div className="calculator-grid">
    <div className='output'>
    <div className="previous-operand">{previousOperand} {operation}</div>
    <div className="current-operand">{currentOperand}</div>
    </div> 
   
    <button className='span-two'onClick={ () =>{dispatch({type:ACTIONS.CLEAR})}}>AC</button>
    <button >DEL</button>
    <OperaButton operation="÷" dispatch={dispatch}/>
    <DigiButton digit="1" dispatch={dispatch}/>
    <DigiButton digit="2" dispatch={dispatch}/>
    <DigiButton digit="3" dispatch={dispatch}/>
    <OperaButton operation="*" dispatch={dispatch}/>
    <DigiButton digit="4" dispatch={dispatch}/>
    <DigiButton digit="5" dispatch={dispatch}/>
    <DigiButton digit="6" dispatch={dispatch}/>
    <OperaButton operation="+" dispatch={dispatch}/>
    <DigiButton digit="7" dispatch={dispatch}/>
    <DigiButton digit="8" dispatch={dispatch}/>
    <DigiButton digit="9" dispatch={dispatch}/>
    <OperaButton operation="-" dispatch={dispatch}/>
    <DigiButton digit="." dispatch={dispatch}/>
    <DigiButton digit="0" dispatch={dispatch}/>
    <button className='span-two' onClick={()=>{dispatch({type:ACTIONS.EVALUATE})}}>=</button> 
    </div>
    

  )
 
   
 
}

export default App;
