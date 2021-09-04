# coko-useWs
### 介绍
用来建立websokcet连接的Hook。加入了重连机制。

### 使用
[demo](https://codesandbox.io/s/coko-usewebsocket-demo-iui81)
```
npm i coko-usewebsocket
```

### API
| 参数  | 说明  |  类型 |  默认值 |  
|---|---|---|---|
| url  | ws连接地址，必填  |  string |   |  
| opt | 其他选项   | object  |   | 

## opt 
| 参数  | 说明  |  类型 |  默认值 |  
|---|---|---|---|
| onOpen  | ws的onOpen回调  |  (event: WebSocketEventMap['open']) => void; |   |  
| onMessage  | ws的onMessage回调  |  (event: WebSocketEventMap['message']) => void; |   |  
| onClose  | ws的onClose回调  |  (event: WebSocketEventMap['close']) => void; |   | 
| onError  | ws的onError回调  |  (event: WebSocketEventMap['error']) => void; |   | 
| reconnectDelay  | 重连间隔，单位ms   | number  | 3000  | 
| reconnectTime  | 重连次数限制   | number  |  3 | 
