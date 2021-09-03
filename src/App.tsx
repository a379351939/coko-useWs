import React, {useEffect} from 'react'
import ReactDOM from 'react-dom'
import useWebSocket from './useWebSocket'

function App(){
  const { sendMsg, newMsg } = useWebSocket('wss://ai-api.daikin.net.cn/wss-ias-log')
  useEffect(()=>{
    sendMsg('haha')
  },[])

  useEffect(()=>{
  },[newMsg])

  return (
    <div>
      <button onClick={()=>{sendMsg('heihei')}}>heihei</button>
    </div>
  )
}

export default App
