import { Type, Static } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = addFormats(new Ajv({ allErrors: true }), [
]);

export const cesspitCommentSchema = Type.Object({
    commentId: Type.Optional(Type.Integer()), 
    userId: Type.String(),
    topicId: Type.Integer(),
    parentCommentId: Type.Union([Type.Null(), Type.Integer()]),
    likes: Type.Optional(Type.Integer()), 
    content: Type.String(),

});

const validateCesspitComment = ajv.compile(cesspitCommentSchema);

export { validateCesspitComment };

export type CesspitCommentSchemaType = Static<typeof cesspitCommentSchema>;