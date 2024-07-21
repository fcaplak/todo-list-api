import * as bcrypt from 'bcrypt';

/**
 * Password hash function
 * @description - This function hashes password using bcrypt
 * @param password - Password to be hashed
 * @returns - Promise that resolves to the bcrypt hash of the password
 */
export async function hashPassword(textPassword: string) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(textPassword, salt);
  return hash;
}

/**
 * Password compare function
 * @description - This function compares password with password hash
 * @param password - Password to be checked
 * @param hash - Hash to be checked against
 * @returns - Promise that resolves to a boolean indicating whether the password matches the hash
 */
export async function comparePassword(
  textPassword: string,
  hashedPassword: string,
) {
  const match = await bcrypt.compare(textPassword, hashedPassword);
  if (!match) throw new Error();
}
