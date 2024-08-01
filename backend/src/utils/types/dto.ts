export interface UserOpinion {
    id: number;
    title: string;
    text: string;
    backgroundImage: string;
    parentopinionid: number | null;
    author: string;
    authorProfileImage: string;
  }

  export interface RebuttalsAndOpinions {
    rebuttals: UserOpinion[];
    rebuttaledOpinions: UserOpinion[];
}

  export interface UserComment {
    id: number;
    author: string;
    parentCommentAuthor: string;
    content: string;
    authorProfilePicture: string;
    parentcommentid: number | null;
    likes: number;
    createdAt: Date;
    UpdatedAt: Date;
  }

