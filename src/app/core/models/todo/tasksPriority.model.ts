export interface ITasksPriority {
    id?: number;
    label?: string;
    color?: string;
    priority?: string;
}

export class TasksPriority implements ITasksPriority {
    constructor(
        public id?: number,
        public label?: string,
        public color?: string,
        public priority?: string,
    ) {}
}