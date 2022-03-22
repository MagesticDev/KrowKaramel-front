import { IAnimatorPodcast } from "./animators.model";
import { ICommentPodcast } from "./comments.model";
import { IExtractPodcast } from "./extracts.model";

export interface IPodcast {
    id?: number;
    categories?: number;
    title?: string;
    description?: string;
    content?: string;
    url?: string;
    publish_date?: Date;
    modif_date?: Date;
    publish_author?: string;
    images?: string;
    cover?: string;
    explicit?: boolean;
    number_season?: number;
    title_season?: string;
    number_episode?: number;
    title_episode?: string;
    chapter_url_json?: JSON;
    published?: boolean;
    localisation?: string;
    localisation_name?: string;
    url_audio?: string;
    animators?: IAnimatorPodcast[];
    extract?: IExtractPodcast[];
    comments?: ICommentPodcast[];
}

export class Podcast implements IPodcast {
    constructor(
        public id?: number,
        public categories?: number,
        public title?: string,
        public description?: string,
        public content?: string,
        public url?: string,
        public publish_date?: Date,
        public modif_date?: Date,
        public publish_author?: string,
        public images?: string,
        public cover?: string,
        public explicit?: boolean,
        public number_season?: number,
        public title_season?: string,
        public number_episode?: number,
        public title_episode?: string,
        public chapter_url_json?: JSON,
        public published?: boolean,
        public localisation?: string,
        public localisation_name?: string,
        public url_audio?: string,
        public animators?: IAnimatorPodcast[],
        public extract?: IExtractPodcast[],
        public comments?: ICommentPodcast[]
    ) {}
}