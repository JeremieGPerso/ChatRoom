import { MessageModel } from "./message.model";

export interface ConversationModel {
    id: string,
    members: string[],
    createdAt: string,
    lastMessage: MessageModel,
};