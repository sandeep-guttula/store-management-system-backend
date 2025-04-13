// ==== User Roles ====
export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    STORE_OWNER: 'STORE_OWNER',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// ==== JWT Config ====
export const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
export const JWT_EXPIRES_IN = '1d';

// ==== Password Policy ====
export const PASSWORD_POLICY = {
    MIN_LENGTH: 8,
    MAX_LENGTH: 16,
    MUST_HAVE_UPPERCASE: true,
    MUST_HAVE_SPECIAL_CHAR: true,
};

export const PASSWORD_REGEX = {
    UPPERCASE: /[A-Z]/,
    SPECIAL_CHAR: /[^a-zA-Z0-9]/,
};

// ==== Bcrypt ====
export const SALT_ROUNDS = 10;

// ==== Pagination Defaults ====
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
};
