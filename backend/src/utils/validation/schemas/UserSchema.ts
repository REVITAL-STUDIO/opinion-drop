import { Type, Static } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Initialize AJV with formats
const ajv = addFormats(new Ajv({ allErrors: true }), [
  'email', // Example of adding email format validation
]);

// Define the user schema using TypeBox
export const userSchema = Type.Object({
  userId:Type.Number(),
  username: Type.String(),
  email: Type.String({ format: 'email' }), 
  bio: Type.Union([Type.Null(), Type.String()]),
  profilePicture: Type.Union([Type.Null(), Type.String()]),
  politicalAlignment: Type.Union([Type.Null(), Type.String()]),
});

// Validate the schema with AJV
const validate = ajv.compile(userSchema);

// Export the schema and validation function
export { validate };

// Define a TypeScript type based on the static type of the schema
export type UserSchemaType = Static<typeof userSchema>;