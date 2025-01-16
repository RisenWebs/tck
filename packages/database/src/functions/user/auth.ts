import bcrypt from 'bcrypt';

import { prisma } from '../../client';
import { getUserByEmail } from './fetch';

/**
 * Tries to login a user with their email.
 * @param username The username provided.
 * @param password The password provided.
 * @returns Returns a user object if the login was successful, `false` otherwise.
 */
export async function tryLoginWithEmail(email: string, password: string) {
  // Check if the user exists.
  const user = await getUserByEmail(email.trim().toLowerCase());
  if (!user) {
    return null;
  }

  // Check if password matches.
  const success = await bcrypt.compare(password, user.password);
  if (!success) {
    return null;
  }

  // Don't send the password hash to the client.
  user.password = undefined as any;

  return user;
}

/**
 * Checks if a user's authorization is valid.
 * @param authorization The user's authorization/API key.
 * @returns True if the authorization is valid, false otherwise.
 */
export async function validateAuthorization(authorization: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { apiKey: authorization }
  });

  return user !== null;
}
