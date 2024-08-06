import { Type, Static } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = addFormats(new Ajv({ allErrors: true }), [
]);

export const highlightSchema = Type.Object({
    highlightId: Type.String(), 
    userId: Type.String(),
    opinionId: Type.Integer(),
    highlightedText: Type.String(),
    reactionText: Type.String(),
    reactionType: Type.String(),
});

const validate = ajv.compile(highlightSchema);

export { validate };

export type HighlightSchemaType = Static<typeof highlightSchema>;