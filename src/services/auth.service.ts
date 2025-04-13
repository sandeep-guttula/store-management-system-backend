import prisma from '../config/database';
import { hashPassword } from '../utils/password';
import { SignupInput } from '../types/user.types';
import { comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { LoginInput } from '../types/user.types';

export const createUser = async (data: SignupInput) => {
    const { name, email, address, password, role } = data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        throw new Error('Email already in use');
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            address,
            password: hashed,
            role,
        },
    });

    return { id: user.id, name: user.name, email: user.email, role: user.role };
};

export const loginUser = async ({ email, password }: LoginInput) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('Invalid credentials');

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const token = generateToken(user);

    return {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token,
    };
};
