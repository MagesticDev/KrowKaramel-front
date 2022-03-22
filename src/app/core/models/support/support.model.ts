export interface ITicket {
    id?: number;
    type?: string;
    author?: string;
    title?: string;
    status?: string;
    newAnswer?: boolean;
}

export class Ticket implements ITicket {
    constructor(
        public id?: number,
        public type?: string,
        public author?: string,
        public title?: string,
        public status?: string,
        public newAnswer?: boolean,
    ) {}
}