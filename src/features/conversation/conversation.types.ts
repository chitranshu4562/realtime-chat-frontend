export type ConversationType = 'DIRECT' | 'GROUP';

export type MessageStatus = 'PENDING' | 'DELIVERED' | 'READ';

export type ConversationMember = {
    id: number;
    name: string;
    isAdmin: boolean;
}

export type Conversation = {
    id: number;
    type: ConversationType;
    name: string | null;
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
    name?: string;
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

export type MessageRecipientStatus = {
    recipientId: number;
    recipientName: string | null;
    statusType: MessageStatus;
    updatedAt: string;
}

export type MessageDetails = {
    id: number;
    content: string;
    createdAt: string;
    sender: { id: number; name: string | null };
    statuses: MessageRecipientStatus[];
}

export type FetchMessageDetailsQueryParams = {
    messageId: number;
}

export type FetchMessageDetailsResponseData = MessageDetails;
