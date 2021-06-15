import {react,useRef} from 'react';
import MessageComp from './messageComponent';
import './chatComponent.css';
export function ChatComponent(props){
    
    let msgArea = useRef(null);
    

    return <div className={props.show?"mainClz":"mainClzHidden"}>
        
        <div>Send Messaged to the users</div><br/><br/>
        <div>
            {props.messages.map((obj)=>{
                return <MessageComp msg={obj.msg} userName={obj.userName}/>
            })}
        </div>
        <div className="secClz">
            <input ref={msgArea} onChange={(event)=>{msgArea.current.value=event.target.value}} className="secClzInput" size="1200"></input><br/><br/>
            <button onClick={()=>{props.messageAll(msgArea.current.value); msgArea.current.value=""}}>Send Message</button>
            <button>Close Chat</button>
        </div>
        
    </div>;
}