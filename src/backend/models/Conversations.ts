export interface ConversationModel {
    id: string,
    members: string[],
    messages: MessageModel[],
};

export interface MessageModel {
    sender: string,
    content: string,
    timestamp: string,
};
    