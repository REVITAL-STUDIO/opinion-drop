import { Type, Static } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = addFormats(new Ajv({ allErrors: true }), [
]);

export const commentSchema = Type.Object({
    commentId: Type.Optional(Type.Integer()), 
    userId: Type.Integer(),
    opinionId: Type.Integer(),
    parentCommentId: Type.Union([Type.Null(), Type.Integer()]),
    likes: Type.Optional(Type.Integer()), 
    content: Type.String(),

});

const validate = ajv.compile(commentSchema);

export { validate };

export type CommentSchemaType = Static<typeof commentSchema>;