export interface ITasks {
    Id: number;
    Title: string;
    UID: number;
    StartTask: Date;
    EndTask: Date;
    Estimate: string;
    Tags: string;
    Summary: string;
    RankId: number;
    Color: string;
    Status: string;
    StatusColor: string;
    Priority: string;
    PriorityColor: string;
    Assignee: string;
    PriorityLabel: string;
}

export class Tasks implements ITasks {
    constructor(
        public Id: number,
        public Title: string,
        public UID: number,
        public StartTask: Date,
        public EndTask: Date,
        public Estimate: string,
        public Tags: string,
        public Summary: string,
        public RankId: number,
        public Color: string,
        public Status: string,
        public StatusColor: string,
        public Priority: string,
        public PriorityColor: string,
        public Assignee: string,
        public PriorityLabel: string
    ) {}
}