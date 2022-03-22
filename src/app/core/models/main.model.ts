import { IMenu } from "./menu.model";

export interface IMain {
    title?: string;
    titleInitial?: string;
    facebook?: string;
    facebook_desc?: string;
    twitter?: string;
    twitter_desc?: string;
    youtube?: string;
    youtube_desc?: string;
    linkedin?: string;
    linkedin_desc?: string;
    dateStartWebsite?: Date;
    copyright?: string;
    url?: string;
    https?: string;
    tchatActive?: boolean;
    forumActive?: boolean;
    menu?: IMenu[];
}

export class Main implements IMain {
    constructor(
        public title?: string,
        public titleInitial?: string,
        public facebook?: string,
        public facebook_desc?: string,
        public twitter?: string,
        public twitter_desc?: string,
        public youtube?: string,
        public youtube_desc?: string,
        public linkedin?: string,
        public linkedin_desc?: string,
        public dateStartWebsite?: Date,
        public copyright?: string,
        public url?: string,
        public https?: string,
        public tchatActive?: boolean,
        public forumActive?: boolean,
        public menu?: IMenu[],
    ) {}
}