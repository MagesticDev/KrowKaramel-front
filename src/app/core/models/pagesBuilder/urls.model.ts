
export interface IUrlsPages {
    id?: number;
    page_id?: number;
    path?: string;
    is_add_menu?: boolean;
    menu_title?: string;
    icon?: string;
}

export class UrlsPages implements IUrlsPages {
    constructor(
        public id?: number,
        public page_id?: number,
        public path?: string,
        public is_add_menu?: boolean,
        public menu_title?: string,
        public icon?: string
    ) {}
}