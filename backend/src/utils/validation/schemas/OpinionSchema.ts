import { Type, Static } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = addFormats(new Ajv({ allErrors: true }), [
]);

export const opinionSchema = Type.Object({
    opinionId: Type.Optional(Type.Integer()), 
    userId: Type.String(),
    topicId: Type.Integer(),
    title: Type.String(),
    textContent: Type.String(),
    backgroundImage: Type.Union([Type.Null(), Type.String()]),
    parentOpinionId: Type.Union([Type.Null(), Type.Integer()]),
    images: Type.Union([Type.Null(), Type.Array(Type.String())]),
    videos: Type.Union([Type.Null(), Type.Array(Type.String())]),
    documents: Type.Union([Type.Null(), Type.Array(Type.String())]),
    audios: Type.Union([Type.Null(), Type.Array(Type.String())]),

});

const validate = ajv.compile(opinionSchema);

export { validate };

export type OpinionSchemaType = Static<typeof opinionSchema>;