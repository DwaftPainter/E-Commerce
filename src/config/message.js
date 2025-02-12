export const validate = {
    required: {
        email: 'Email is required.',
        name: 'Username is required.',
        password: 'Password is required.',
        phone: 'Phone number is required.',
        address: 'Address is required.',
    },
    format: {
        email: 'Invalid email format.',
        password: 'Invalid password format.',
        password2: 'Password must be at least 8 characters long and include at least one charater, and one number.',
        phone: 'Invalid phone number.',
        role: 'Invalid role.',
    },
    empty: {
        email: 'Email cannot be empty.',
        name: 'Username cannot be empty.',
        phone: 'Phone number cannot be empty.',
    },
    min: {
        name: 'Username must be at least {#limit} characters long.',
        address: 'Address must be at least {#limit} characters long.',
    },
    max: {
        name: 'Username cannot exceed {#limit} characters.',
        address: 'Address cannot exceed {#limit} characters.',
    },
    email_already_taken: 'This email is already in use.',
    user_notfound: 'Account not found.',
    wrong_password: 'Incorrect password.'
};
