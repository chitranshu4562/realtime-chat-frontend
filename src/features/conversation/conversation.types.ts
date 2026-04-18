export type ConversationType = 'DIRECT' | 'GROUP';

export type CreateConversationRequestBody = {
    type: ConversationType;
    memberIds: number[];
}

export type CreateConversationResponseData = {
    conversationId: number;
}
