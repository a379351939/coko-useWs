interface Res {
    sendMsg: WebSocket["send"];
    newMsg?: WebSocketEventMap["message"];
}
interface Opt {
    onOpen?: (event: WebSocketEventMap['open']) => void;
    onMessage?: (message: WebSocketEventMap['message']) => void;
    onClose?: (event: WebSocketEventMap['close']) => void;
    onError?: (event: WebSocketEventMap['error']) => void;
    reconnectDelay?: number;
    reconnectTime?: number;
}
declare function useWs(url: string, opt?: Opt): Res;
export default useWs;
