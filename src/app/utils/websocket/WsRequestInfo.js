import WsMessageType from "./WsMessageType"
export var SubscribeMessage = function (data)  
{  
  this.messageType =WsMessageType.SUBSCRIBE;
  this.data = data;
} 

export const heartBeat = 
{  
    messageType:WsMessageType.HEARTB_BEAT
} 
   