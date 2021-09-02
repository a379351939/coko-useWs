import { useEffect, useRef, useState } from 'react';

interface Res {
  sendMsg: WebSocket["send"]
  newMsg?: WebSocketEventMap["message"]
}

interface Opt {
  onOpen?: (event: WebSocketEventMap['open']) => void;
  onMessage?: (message: WebSocketEventMap['message']) => void;
  onClose?: (event: WebSocketEventMap['close']) => void;
  onError?: (event: WebSocketEventMap['error']) => void;
  reconnectDelay?: number;
  reconnectTime?: number;
}


function useWebSocket(url:string, opt:Opt = {}):Res {
  const { onMessage,
          onOpen,
          onClose,
          onError,
          reconnectDelay = 3000,
          reconnectTime = 3,
        } = opt

  const wsRef = useRef<WebSocket>()
  const reconnectTimerRef = useRef<number>()
  const [newMsg, setNewMsg] = useState<WebSocketEventMap['message']>()
  const sendMsgQueueRef = useRef<(string | ArrayBufferLike | Blob | ArrayBufferView)[]>([])
  const reconnectCountRef = useRef<number>(0)

  const init = () => {
    const wsIns = new WebSocket(url)
    wsRef.current = wsIns

    wsIns.onopen = (e) => {
      onOpen && onOpen(e)
      while (sendMsgQueueRef.current.length > 0) {
        const msg = sendMsgQueueRef.current.shift()
        msg && wsIns.send(msg)
      }
    }

    wsIns.onerror = (e) => {
      onError && onError(e)
      console.log('error');
      reconnect()
    }

    wsIns.onmessage = (e) => {
      onMessage && onMessage(e)
      setNewMsg(e)
    }

    wsIns.onclose = (e) => {
      onClose && onClose(e)
      console.log('error');
      reconnect()
    }
  }

  const reconnect = () => {
    if(wsRef.current?.readyState !== 1 && reconnectCountRef.current < reconnectTime) {
      reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current)
      reconnectTimerRef.current = window.setTimeout(()=>{
        console.log(reconnectCountRef.current);
        init()
        reconnectCountRef.current++
      },reconnectDelay)
    }
  }

  const sendMsg:WebSocket['send'] = (message) => {
    if(wsRef.current && wsRef.current.readyState === 1) {
      wsRef.current.send(message)
    } else {
      sendMsgQueueRef.current.push(message)
    }
  }

  const disconnect = () => {
    reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current)
    wsRef.current?.close()
  }

  useEffect(()=>{
    init()
    return () => disconnect()
  },[url])

  return { newMsg, sendMsg }
}

export default useWebSocket
