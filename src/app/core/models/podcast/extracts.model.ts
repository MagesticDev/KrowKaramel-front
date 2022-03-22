export interface IExtractPodcast {
    id?: number;
    podcast_id?: number;
    time_start?: string;
    time_end?: string;
    duration?: string;
}

export class ExtractPodcast implements IExtractPodcast {
    constructor(
        public id?: number,
        public podcast_id?: number,
        public time_start?: string,
        public time_end?: string,
        public duration?: string
    ) {}
}