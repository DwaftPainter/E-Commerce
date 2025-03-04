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

export const notifications = {
    account: {
      accountCreated: "Welcome, [USERNAME]!",
      accountLogIn: "Welcome back, [USERNAME]!",
      passwordResetRequest: "We received a request to reset your password. Click the link below to set a new one: [RESET_LINK]. If you didn’t request this, please ignore this message.",
      wrongPassword: "Incorrect password. Please try again or reset your password if you forgot it.",
      invalidEmail: "The email address you entered is invalid. Please check and try again.",
      accountLocked: "Too many failed login attempts. Your account has been temporarily locked. Please reset your password or try again later.",
      emailVerified: "Your email has been successfully verified. Enjoy shopping with us!",
      emailVerificationRequired: "Please verify your email to activate your account: [VERIFICATION_LINK].",
      failureToChangeAccountDetail: "Failure to change your profile!",
      successToChangeAccountDetail: "Profile updated successfully!"
    },
    order: {
      orderConfirmation: "Thank you for your purchase! Your order #[ORDER_NUMBER] has been confirmed.",
      orderShipped: "Great news! Your order #[ORDER_NUMBER] has been shipped. Expected delivery: [DELIVERY_DATE]. Track it here: [TRACKING_LINK].",
      orderDelivered: "Your order #[ORDER_NUMBER] has been delivered! We hope you love your purchase. Need help? Contact us at [SUPPORT_LINK].",
      orderCanceled: "Your order #[ORDER_NUMBER] has been canceled. If you have any questions, please contact our support team at [SUPPORT_LINK].",
      paymentFailed: "Payment for order #[ORDER_NUMBER] failed. Please update your payment details and try again: [PAYMENT_LINK].",
      refundProcessed: "Your refund for order #[ORDER_NUMBER] has been processed. It may take [X] days to reflect in your account."
    },
    cart: {
      abandonedCartReminder: "You left something in your cart! Complete your purchase now before your favorite items sell out: [CHECKOUT_LINK].",
      wishlistReminder: "The item [PRODUCT_NAME] in your wishlist is now on sale! Grab it before it's gone: [PRODUCT_LINK]."
    },
    promotions: {
      exclusiveOffer: "A special discount just for you! Get [X]% off your next order. Use code: [DISCOUNT_CODE] at checkout. Shop now: [SHOP_LINK].",
      limitedTimeSale: "Hurry! Our sale ends in [X] hours. Don’t miss out on amazing discounts: [SALE_LINK].",
      birthdayDiscount: "Happy Birthday, [USERNAME]! Here’s a special gift – [X]% off your next order. Use code: [BIRTHDAY_CODE]."
    },
    support: {
      supportTicketReceived: "We've received your request #[TICKET_NUMBER] and our support team will respond soon. You can track your request here: [SUPPORT_LINK].",
      surveyFeedbackRequest: "We’d love to hear your feedback! Please take a moment to rate your recent experience: [FEEDBACK_LINK].",
      reviewRequest: "Enjoying your recent purchase? Share your thoughts and leave a review: [REVIEW_LINK]."
    },
    security: {
      suspiciousLoginAttempt: "We detected an unusual login attempt on your account from [LOCATION/DEVICE]. If this wasn’t you, please change your password immediately: [SECURITY_LINK].",
      privacyPolicyUpdate: "We’ve updated our Privacy Policy. Please review the changes here: [PRIVACY_POLICY_LINK]."
    },
    contact: {
        messageSent: "Thank you for your message! We've received it and will get back to you soon."
      }
  };
  
  export default notifications;
  