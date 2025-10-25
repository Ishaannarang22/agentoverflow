"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkMessage = void 0;
/**
 * Holds a message that is sent over the network.
 */
class NetworkMessage {
    /**
     * @param senderInfo - Information about the sender.
     * @param message - The message content.
     * @param messageData - The message data.
     */
    constructor(senderInfo, message, messageData) {
        this.senderInfo = senderInfo;
        this.senderUserId = senderInfo.userId;
        this.senderConnectionId = senderInfo.connectionId;
        this.message = message;
        this.data = messageData;
    }
}
exports.NetworkMessage = NetworkMessage;
//# sourceMappingURL=NetworkMessage.js.map