import { Type, Static } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = addFormats(new Ajv({ allErrors: true }), [
]);

export const topicSchema = Type.Object({
    topicId: Type.Optional(Type.Integer()), 
    name: Type.String(),
    description: Type.String(),
    createdAt: Type.Date(),
});

const validate = ajv.compile(topicSchema);

export { validate };

export type TopicSchemaType = Static<typeof topicSchema>;