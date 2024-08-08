export interface UserOpinion {
  id: number;
  title: string;
  text: string;
  backgroundImage: string;
  parentopinionid: number | null;
  author: string;
  authorProfileImage: string;
  totallikes?: number;
  totaldislikes?: number;
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

export interface SurveyQuestion {
  questionId: number;
  questionText: string;
}

export interface TopicSurvey {
  surveyId: number;
  questions: SurveyQuestion[];
  topicId: number;
}

export interface SurveyResponse {
  userId: string;
  surveyId: number;
  answers: {
    [questionId: number]: number;
  }
}


