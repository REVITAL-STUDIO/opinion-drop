import { Type, Static } from '@sinclair/typebox';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Initialize AJV with formats
const ajv = addFormats(new Ajv({ allErrors: true }), [
  'email', // Example of adding email format validation
]);

// Define the user schema using TypeBox
export const userSchema = Type.Object({
  userId: Type.Optional(Type.Number()),
  username: Type.String(),
  email: Type.String({ format: 'email' }), 
  passwordHash: Type.String(),
  bio: Type.Optional(Type.String()),
  profilePicture: Type.Optional(Type.String()),
  politicalAlignment: Type.Optional(Type.String()),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});

// Validate the schema with AJV
const validate = ajv.compile(userSchema);

// Export the schema and validation function
export { validate };

// Define a TypeScript type based on the static type of the schema
export type UserSchemaType = Static<typeof userSchema>;