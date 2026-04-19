export type SocketSuccessResponse<T = unknown> = {
    success: true;
    message: string;
    data?: T;
}

export type SocketErrorResponse = {
    success: false;
    message: string;
}

export type SocketResponse<T = unknown> = SocketSuccessResponse<T> | SocketErrorResponse;