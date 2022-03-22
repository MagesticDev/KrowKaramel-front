export interface ITasksStatus {
    id?: number;
    field?: string;
    customBackground?: string;
    description?: string;
    headerText?: string;
    position?: number;
}

export class TasksStatus implements ITasksStatus {
    constructor(
        public id?: number,
        public field?: string,
        public customBackground?: string,
        public description?: string,
        public headerText?: string,
        public position?: number
    ) {}
}