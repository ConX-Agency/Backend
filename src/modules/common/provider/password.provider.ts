import * as bcrypt from 'bcrypt';

export class PasswordService {
    /**
     * Hash a plain-text password.
     * @param password The plain-text password to hash.
     * @param saltRounds The number of salt rounds (default: 10).
     * @returns A promise that resolves with the hashed password.
     */
    public async hashPassword(password: string, saltRounds: number = 10): Promise<string> {
        return await bcrypt.hash(password, saltRounds);
    }

    /**
 * Validate a plain-text password against a hashed password.
 * @param password The plain-text password.
 * @param hashedPassword The hashed password.
 * @returns A promise that resolves with true if the password matches, false otherwise.
 */
    public async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}