import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import useWs from './useWs'

function App(){
  const { sendMsg, newMsg } = useWs('wss://ai-api.daikin.net.cn/wss-ias-log')
  useEffect(()=>{
    console.log('test');
    sendMsg('haha')
  },[])

  console.log(newMsg);
  useEffect(()=>{
  },[newMsg])

  return (
    <div>
      <button onClick={()=>{sendMsg('heihei')}}>heihei</button>
    </div>
  )
}

export default App
