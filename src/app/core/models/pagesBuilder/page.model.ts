import { IDocumentFile } from './documents.model';

export interface IPage {
    page_id?: number;
    title?: string;
    description?: string;
    content?: string;
    published_date?: Date;
    created_date?: Date;
    depublished_at?: Date;
    author?: string;
    is_published?: boolean;
    tags?: string;
    metatags?: string;
    documents?: IDocumentFile[];
    path?: string;
    is_add_menu?: boolean;
    menu_title?: string;
    icon?: string;
    custom_css?: string;
    number_view?: number;
    capture?: string;
    is_logged?: boolean;
    is_admin?: boolean;
    hasHeader?: boolean;
}

export class Page implements IPage {
    constructor(
        public page_id?: number,
        public title?: string,
        public description?: string,
        public content?: string,
        public published_date?: Date,
        public created_date?: Date,
        public depublished_at?: Date,
        public author?: string,
        public is_published?: boolean,
        public tags?: string,
        public metatags?: string,
        public documents?: IDocumentFile[],
        public path?: string,
        public is_add_menu?: boolean,
        public menu_title?: string,
        public icon?: string,
        public custom_css?: string,
        public number_view?: number,
        public capture?: string,
        public is_logged?: boolean,
        public is_admin?: boolean,
        public hasHeader?: boolean
    ) {}
}