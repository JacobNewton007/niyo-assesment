import * as bcrypt from 'bcryptjs';
/**
 * Ensure value is string
 * @param value
 * @returns
 */
export const EnsureNonEmptyStringValue = (value: any): boolean => {
  if (typeof value === 'string' && value.trim() !== '') {
    return true;
  }
  return false;
};
/**
 * Compare hash with plain string
 * @param hash
 * @param plainString
 * @returns
 */
export const compareHash = (hash: string, plainString: string): boolean => {
  return bcrypt.compareSync(plainString, hash);
};

/**
 * Hash string
 * @param plainString
 * @returns
 */
export const hashString = (plainString: string): string => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(plainString, salt);
  return hash;
};
