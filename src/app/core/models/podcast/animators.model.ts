export interface IAnimatorPodcast {
    id?: number;
    firstname?: string;
    lastname?: string;
    website_url?: string;
    group?: string;
    role?: string;
    podcast_id?: number;
    name?: string;
}

export class AnimatorPodcast implements IAnimatorPodcast {
    constructor(
        public id?: number,
        public firstname?: string,
        public lastname?: string,
        public website_url?: string,
        public group?: string,
        public role?: string,
        public podcast_id?: number,
        public name?: string
    ) {}
}