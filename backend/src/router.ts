import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { OpinionController } from './controllers/OpinionController';
import { CommentController } from './controllers/CommentController';
import { TopicController } from './controllers/TopicController';
import { RatingController } from './controllers/RatingController';
import multer from 'multer';
import { SurveyController } from './controllers/SurveyController';

const upload = multer();
const router = Router();

// Instantiate controllers
const userController = new UserController();
const opinionController = new OpinionController();
const commentController = new CommentController();
const topicController = new TopicController();
const ratingController = new RatingController();
const surveyController = new SurveyController();



// User Routes
// router.post('/users', userController.createUser.bind(userController));
router.post('/users/register/credentials', userController.registerUserCredentials.bind(userController));
router.post('/users/register/provider', userController.registerUserProvider.bind(userController));
router.post('/users/login', userController.loginUser.bind(userController));
router.get('/users/:userId', userController.getUser.bind(userController));
router.put('/users/:userId', userController.updateUser.bind(userController));
router.delete('/users/:userId', userController.deleteUser.bind(userController));


// Opinion Routes
router.post('/opinions',upload.single('backgroundImage'), opinionController.createOpinion.bind(opinionController));
router.post('/opinions/rebuttal',upload.single('backgroundImage'), opinionController.createOpinion.bind(opinionController));
router.get('/opinions/:opinionId', opinionController.getOpinion.bind(opinionController));
router.get('/opinions', opinionController.getOpinions.bind(opinionController));
router.get('/opinions/topic/:topicId', opinionController.getOpinionsByTopic.bind(opinionController));
router.get('/opinions/user/:userId', opinionController.getOpinionsByUser.bind(opinionController));
router.get('/rebuttals/user/:userId', opinionController.getRebuttalsByUser.bind(opinionController));
router.get('/opinion/rebuttals/:opinionId', opinionController.getOpinionRebuttals.bind(opinionController));
router.get('/opinions/favorites/:userId', opinionController.getFavoriteOpinions.bind(opinionController));
router.put('/opinions/:opinionId', opinionController.updateOpinion.bind(opinionController));
router.put('/opinions/like/:opinionId', opinionController.likeOpinion.bind(opinionController));
router.put('/opinions/unlike/:opinionId', opinionController.unlikeOpinion.bind(opinionController));
router.post('/opinions/userliked/:opinionId', opinionController.userHasLiked.bind(opinionController));
router.get('/opinions/numLikes/:opinionId', opinionController.getNumLikes.bind(opinionController));
router.put('/opinions/dislike/:opinionId', opinionController.dislikeOpinion.bind(opinionController));
router.put('/opinions/undislike/:opinionId', opinionController.undislikeOpinion.bind(opinionController));
router.post('/opinions/userDisliked/:opinionId', opinionController.userHasDisliked.bind(opinionController));
router.get('/opinions/numDislikes/:opinionId', opinionController.getNumDislikes.bind(opinionController));
router.put('/opinions/favorite/:opinionId', opinionController.favoriteOpinion.bind(opinionController));
router.put('/opinions/unfavorite/:opinionId', opinionController.unfavoriteOpinion.bind(opinionController));
router.delete('/opinions/:opinionId', opinionController.deleteOpinion.bind(opinionController));


// Opinion Comment Routes
router.post('/comments/opinion/:opinionId', commentController.createOpinionComment.bind(commentController));
router.get('/comments/:commentId', commentController.getComment.bind(commentController));
router.get('/comments/opinion/:opinionId', commentController.getOpinionComments.bind(commentController));
router.get('/comments/children/:commentId', commentController.getChildOpinionComments.bind(commentController));
router.post('/comments/userLiked/:commentId', commentController.userHasLiked.bind(commentController));
router.put('/comments/like/:commentId', commentController.likeComment.bind(commentController));
router.put('/comments/unlike/:commentId', commentController.unlikeComment.bind(commentController));
router.put('/comments/:commentId', commentController.updateComment.bind(commentController));
router.delete('/comments/:commentId', commentController.deleteComment.bind(commentController));
// Cesspit Comment Routes
router.post('/comments/cesspit/:topicId', commentController.createCesspitComment.bind(commentController));
router.get('/comments/cesspit/topic/:topicId', commentController.getCesspitComments.bind(commentController));
router.get('/comments/cesspit/children/:commentId', commentController.getChildCesspitComments.bind(commentController));
router.post('/comments/cesspit/userLiked/:commentId', commentController.userHasLikedCesspit.bind(commentController));
router.put('/comments/cesspit/like/:commentId', commentController.likeCesspitComment.bind(commentController));
router.put('/comments/unlike/cesspit/:commentId', commentController.unlikeCesspitComment.bind(commentController));
router.put('/comments/cesspit/:commentId', commentController.updateCesspitComment.bind(commentController));
router.delete('/comments/cesspit/:commentId', commentController.deleteCesspitComment.bind(commentController));




// Topic Routes
router.post('/topics', topicController.createTopic.bind(topicController));
router.get('/topics/:topicId', topicController.getTopic.bind(topicController));
router.get('/topics', topicController.getTopics.bind(topicController));
router.put('/topics/:topicId', topicController.updateTopic.bind(topicController));
router.delete('/topics/:topicId', topicController.deleteTopic.bind(topicController));

// Rating Routes
router.post('/ratings', ratingController.createRating.bind(ratingController));
router.put('/ratings', ratingController.updateRating.bind(ratingController));
router.post('/ratings/userRated/:opinionId', ratingController.getUserRating.bind(ratingController));

//Survey Routes 
router.get('/surveys/topic/:topicId', surveyController.getSurveyByTopic.bind(surveyController));
router.post('/surveys/submit', surveyController.submitResponse.bind(surveyController));
router.post('/surveys/userSubmitted/:surveyId', surveyController.hasUserSubmittedSurvey.bind(surveyController));




export default router;