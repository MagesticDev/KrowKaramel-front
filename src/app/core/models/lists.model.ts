export interface IListAdmin {
    UID?: number;
    Assignee?: string;
}

export class ListAdmin implements IListAdmin {
    constructor(
        public UID?: number,
        public Assignee?: string
    ) {}
}