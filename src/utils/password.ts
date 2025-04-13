import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/constants';

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (plain: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(plain, hash);
};
