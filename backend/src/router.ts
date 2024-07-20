import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { OpinionController } from './controllers/OpinionController';
import { CommentController } from './controllers/CommentController';
import { TopicController } from './controllers/TopicController';
import { RatingController } from './controllers/RatingController';
import multer from 'multer';

const upload = multer();
const router = Router();

// Instantiate controllers
const userController = new UserController();
const opinionController = new OpinionController();
const commentController = new CommentController();
const topicController = new TopicController();
const ratingController = new RatingController();


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
router.get('/opinions/:opinionId', opinionController.getOpinion.bind(opinionController));
router.get('/opinions', opinionController.getOpinions.bind(opinionController));
router.get('/opinions/topic/:topicId', opinionController.getOpinionsByTopic.bind(opinionController));
router.put('/opinions/:opinionId', opinionController.updateOpinion.bind(opinionController));
router.delete('/opinions/:opinionId', opinionController.deleteOpinion.bind(opinionController));


// Comment Routes
router.post('/comments', commentController.createComment.bind(commentController));
router.get('/comments/:commentId', commentController.getComment.bind(commentController));
router.put('/comments/:commentId', commentController.updateComment.bind(commentController));
router.delete('/comments/:commentId', commentController.deleteComment.bind(commentController));

// Topic Routes
router.post('/topics', topicController.createTopic.bind(topicController));
router.get('/topics/:topicId', topicController.getTopic.bind(topicController));
router.get('/topics', topicController.getTopics.bind(topicController));
router.put('/topics/:topicId', topicController.updateTopic.bind(topicController));
router.delete('/topics/:topicId', topicController.deleteTopic.bind(topicController));



// Rating Routes
router.post('/ratings', ratingController.createRating.bind(ratingController));
router.get('/ratings/:ratingId', ratingController.getRating.bind(ratingController));
router.put('/ratings/:ratingId', ratingController.updateRating.bind(ratingController));
router.delete('/ratings/:ratingId', ratingController.deleteRating.bind(ratingController));

export default router;