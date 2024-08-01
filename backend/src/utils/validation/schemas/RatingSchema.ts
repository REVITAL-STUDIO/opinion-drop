import { Type, Static } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = addFormats(new Ajv({ allErrors: true }), [
]);

export const ratingSchema = Type.Object({
    ratingId: Type.Optional(Type.Integer()), 
    userId: Type.String(),
    opinionId: Type.Integer(),
    value: Type.Integer({ minimum: 1, maximum: 100 }), 
});

const validate = ajv.compile(ratingSchema);

export { validate };

export type RatingSchemaType = Static<typeof ratingSchema>;