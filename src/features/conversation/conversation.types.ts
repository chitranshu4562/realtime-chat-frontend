export type ConversationType = 'DIRECT' | 'GROUP';

export type MessageStatus = 'PENDING' | 'READ';

export type ConversationMember = {
    id: number;
    name: string;
    isAdmin: boolean;
}

export type Conversation = {
    id: number;
    type: ConversationType;
    members: ConversationMember[];
    createdAt: string;
    updatedAt: string;
}

export type Message = {
    id: number;
    content: string;
    conversationId: number;
    senderId: number;
    recipientId: number;
    status: MessageStatus;
    createdAt: string;
    updatedAt: string;
}

export type CreateConversationRequestBody = {
    type: ConversationType;
    memberIds: number[];
}

export type CreateConversationResponseData = {
    conversationId: number;
}

/** Query params for listing conversations (reserved for future filters). */
export type FetchConversationListQueryParams = Record<string, never>;

export type FetchConversationListResponseData = {
    conversations: Conversation[];
}

export type FetchMessagesQueryParams = {
    conversationId: number;
}

export type FetchMessagesResponseData = {
    messages: Message[];
}
