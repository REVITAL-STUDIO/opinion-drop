export interface UserOpinion {
    id: number;
    title: string;
    text: string;
    backgroundImage: string;
    parentOpinionId: number | null;
    author: string;
    authorProfileImage: string;
  }

  export interface UserComment {
    id: number;
    author: string;
    parentCommentAuthor: string;
    content: string;
    authorProfilePicture: string;
    parentCommentId: number | null;
    likes: number;
    createdAt: Date;
    UpdatedAt: Date;
  }