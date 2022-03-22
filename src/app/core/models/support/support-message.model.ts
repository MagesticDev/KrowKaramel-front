export interface ITicketMessage {
    title?: string;
    id?: number;
    type?: string;
    status?: string;
    responses?: IMessage[];
}

export class TicketMessage implements ITicketMessage {
    constructor(
        public title?: string,
        public id?: number,
        public type?: string,
        public status?: string,
        public responses?: IMessage[] 
    ) {}
}

export class Message implements IMessage {
    constructor(
        public id?: number,
        public id_ticket?: number,
        public author?: string,
        public date?: Date,
        public text?: string,
        public sendByAdmin?: boolean
    ){}
}

export interface IMessage {
    id?: number;
    id_ticket?: number;
    author?: string;
    date?: Date;
    text?: string;
    sendByAdmin?: boolean;
}

