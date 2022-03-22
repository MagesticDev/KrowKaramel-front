
export interface IDocumentFile {
    id?: number;
    page_id?: number;
    path?: string;
    name?: string;
    ext?: string;
    size?: string;
    width?: string;
    height?: string;
    progress?: number;
}

export class DocumentFile implements IDocumentFile {
    constructor(
        public id?: number,
        public page_id?: number,
        public path?: string,
        public name?: string,
        public ext?: string,
        public size?: string,
        public width?: string,
        public height?: string,
        public progress?: number
    ) {}
}