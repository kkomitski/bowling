import { email, object, string, type infer as Infer } from 'zod';

// Validation schema
export const UserSchema = object({
  title: string().optional(),
  firstName: string().min(2, 'First name must be at least 2 characters'),
  lastName: string().min(2, 'Surname must be at least 2 characters'),
  email: email().min(2, 'Invalid email'),
  phone: string().optional(),
  region: string().min(1, 'Please include region'),
  company: string().min(1, 'Please include company name'),
  jobTitle: string().min(1, 'Please include job title'),
});

export type User = Infer<typeof UserSchema>;

UserSchema.parse({});
