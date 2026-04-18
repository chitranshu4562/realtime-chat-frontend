export type ConversationType = 'DIRECT' | 'GROUP';

export type ConversationMember = {
    id: number;
    name: string;
}

export type Conversation = {
    id: number;
    type: ConversationType;
    member: ConversationMember;
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
