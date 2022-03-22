export interface IModules {
    id?: number;
    enumModules?: string;
    isActive?: boolean;
    label?: string;
    description?: string;
    type?: string;
    path?: string;
    label_url?: string;
    icon?: string;
}

export class Modules implements IModules {
    constructor(
        public id?: number,
        public enumModules?: string,
        public isActive?: boolean,
        public label?: string,
        public description?: string,
        public type?: string,
        public path?: string,
        public label_url?: string,
        public icon?: string
    ) {}
}