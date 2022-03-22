export interface ICommentPodcast {
    id?: number;
    login?: string;
    date?: Date;
    podcast_id?: number;
    comment?: string;
}

export class CommentPodcast implements ICommentPodcast {
    constructor(
        public id?: number,
        public login?: string,
        public date?: Date,
        public podcast_id?: number,
        public comment?: string
    ) {}
}