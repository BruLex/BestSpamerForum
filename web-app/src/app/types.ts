import { User } from 'firebase';

export interface Post {
    user?: User;
    i_post?: string;
    ownerUid?: string;
    title: string;
    body: string;
    comments?: Comment[];
}

export interface Comment {
    comment: string;
    ownerUid: string;
    rating: number;
    owner?: Partial<User>;
}

export interface BanWord {
    word: string;
}
