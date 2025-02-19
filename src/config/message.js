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
        password2: 'Password must be at least 8 characters long and include at least one character, and one number.',
        phone: 'Invalid phone number.',
        role: 'Invalid role.',
        firstName: 'First name must have at least 1 character.',
        lastName: 'Last name must have at least 1 character.',
        companyName: 'Company name must have at least 1 character.',
        streetAddress: 'Street address must have at least 1 character.',
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
