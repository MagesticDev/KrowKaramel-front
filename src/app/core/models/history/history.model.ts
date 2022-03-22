export interface IHistory {
    history?: IHistoryList[];
    attempts_hack?: IAttempts_hack[];
}

export class History implements IHistory {
    constructor(
        public history?: IHistoryList[],
        public attempts_hack?: IAttempts_hack[]
    ) {}
}

export interface IHistoryList {
    UID?: number;
    action?: string;
    date?: Date;
    historyID?: number;
    ip?: string;
    pseudo?: string;
    libelle?: string;
    isSelected?: boolean;
    allSelectedForDay?: boolean;
}

export class HistoryList implements IHistoryList {
    constructor(
        public UID?: number,
        public action?: string,
        public date?: Date,
        public historyID?: number,
        public ip?: string,
        public pseudo?: string,
        public libelle?: string,
        public isSelected?: boolean,
        public allSelectedForDay?: boolean
    ) {}
}

export interface IAttempts_hack {
    cookie?: string;
    date?: Date;
    description?: string;
    getGet?: string;
    getPost?: string;
    id?: number;
    ip?: string;
    page?: string;
    pseudo?: string;
}

export class Attempts_hack implements IAttempts_hack {
    constructor(
        public cookie?: string,
        public date?: Date,
        public description?: string,
        public getGet?: string,
        public getPost?: string,
        public id?: number,
        public ip?: string,
        public page?: string,
        public pseudo?: string
    ) {}
}