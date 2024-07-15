export interface UserOpinion {
    id: number;
    title: string;
    text: string;
    backgroundImage: string;
    author: string;
    authorProfileImage: string;
  }

  export interface UserComment {
    id: number;
    author: string;
    content: string;
    authorProfilePicture: string;
    parentCommentId: number | null;
    createdAt: Date;
    UpdatedAt: Date;
  }