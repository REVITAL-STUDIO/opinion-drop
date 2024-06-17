import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { OpinionController } from './controllers/OpinionController';
import { TopicController } from './controllers/TopicController';
import { RatingController } from './controllers/RatingController';

const router = Router();

// Instantiate controllers
const userController = new UserController();
const opinionController = new OpinionController();
const topicController = new TopicController();
const ratingController = new RatingController();

// User Routes
router.post('/users', userController.createUser.bind(userController));
router.get('/users/:userId', userController.getUser.bind(userController));
router.put('/users/:userId', userController.updateUser.bind(userController));
router.delete('/users/:userId', userController.deleteUser.bind(userController));



// Opinion Routes
router.post('/opinions', opinionController.createOpinion.bind(opinionController));
router.get('/opinions/:opinionId', opinionController.getOpinion.bind(opinionController));
router.put('/opinions/:opinionId', opinionController.updateOpinion.bind(opinionController));
router.delete('/opinions/:opinionId', opinionController.deleteOpinion.bind(opinionController));



// Topic Routes
router.post('/topics', topicController.createTopic.bind(topicController));
router.get('/topics/:topicId', topicController.getTopic.bind(topicController));
router.put('/topics/:topicId', topicController.updateTopic.bind(topicController));
router.delete('/topics/:topicId', topicController.deleteTopic.bind(topicController));



// Rating Routes
router.post('/ratings', ratingController.createRating.bind(ratingController));
router.get('/ratings/:ratingId', ratingController.getRating.bind(ratingController));
router.put('/ratings/:ratingId', ratingController.updateRating.bind(ratingController));
router.delete('/ratings/:ratingId', ratingController.deleteRating.bind(ratingController));

export default router;