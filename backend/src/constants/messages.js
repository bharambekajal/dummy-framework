const messages = {
  APP: {
    RUNNING: 'App is running on: ',
    SERVER_SHUTDOWN: 'got %s, starting shutdown',
    CLOSING: 'closing...',
    EXITING: 'exiting',
    SUCCESS: 'success',
    ERROR: 'error',
    SUCCESS_RESULT: 'Success result',
    SERVER_ERROR: 'Server error',
    SERVER_SHUTING_DOWN: 'Server Shutting Down',
    SET_ENV:
      'NODE_ENV is not set. Use .env file to set the environment variables?'
  },

  DB: {
    CONNECTION_DONE: 'Db connection done',
    CONNECTION_FAILED: 'Db connection failed'
  },

  AUTH: {
    INVALID_CREDENTIALS: 'Invalid Credentials..!!',
    INVALID_TOKEN: 'Invalid token',
    NOT_AUTHORIZED_TO_ACCESS: 'Not Authorized to access this resource!',
    LOGIN_SUCCESS: 'Login Successfully..!!',
    AUTH_TOKEN_EXPIRED: 'Auth token expired',
    INCORRECT_PASSWORD:'Incorrect Password',
    LOGOUT_SUCCESS: 'Logout Successfully..!!'
  },

  EMAIL: {
    SENT: 'Email sent',
    FAILED: 'Failed to send email',
  },

  ADMIN:{
    NOT_FOUND: 'Admin not found..!!',
  },

  USER: {
    CREATE: 'User is created..!!',
    NOT_FOUND: 'User not found..!!',
    CUSTOMER_FETCHED: 'User data fetched..!!',
    ID_NOT_PROVIDED: 'Please provide a valid customer ID ..!!',
    ACCOUNT_INACTIVE:'Your account is deactivated. Please contact support.',
    DRAFT_SAVED:" user draft saved..!!"
  },

  TPA: {
    TPA_FETCHED: 'Tpa data fetched..!!'
  },

  HIRING_CLIENT: {
    CREATE: 'Hiring client is created..!!',
    NOT_FOUND: 'Hiring client not found..!!',
    DATA_FETCHED: 'Hiring client data fetched..!!'
  },

  DOCUMENT_CATEGORY: {
    CREATE: 'Document category is created..!!',
    NOT_FOUND: 'Document category not found..!!',
    DATA_FETCHED: 'Document category data fetched..!!',
    DATA_DELETED: 'Document deleted successfully..!!',
    UPDATE: 'Document category updated successfully..!'
  },

  VALIDATIONS: {
    INVALID_NAME: 'Invalid Name',
    INVALID_FIRST_NAME: 'Enter Valid First Name',
    INVALID_LAST_NAME: 'Enter Valid Last Name',
    INVALID_EMAIL: 'Enter Valid Email',
    INVALID_PASSWORD: 'Enter Valid Password',
    PASSWORD_LENGTH:
      'Password must be minimum 10 and maximum 16 characters long',
    INVALID_RATING: 'Rating Required Between 1-5',
    ID_UUID: 'id must be a valid UUID'
  },

  INTERNAL_USER: {
    CREATE: 'Internal user is created..!!',
    DATA_FETCHED: 'Internal users data fetched..!!',
    NOT_FOUND: 'Internal User not found..!!',
    UPDATE: 'Internal user is updated..!!'
  },

  NEWS_FEED: {
    DATA_FETCHED: 'Feed news data fetched..!!'
  },

  OVERVIEW: {
    DATA_FETCHED: 'overview data fetched',
    NOT_FOUND: 'overview data not found'
  },

  SCORECARD: {
    CREATE: 'scorecard created successfully',
    DATA_FETCHED: 'scorecard data fetched',
    NOT_FOUND: 'scorecard not found',
    DELETED: 'scorecard deleted successfully',
    UPDATED: 'scorecard data updated successfully'
  },

  CUSTOMER_FEEDBACK: {
    SUBMIT: 'Feedback has been submitted'
  },
  CUSTOM: {
    EMAIL_ALREADY_EXISTS: 'Email already exists',
    SCORECARD_ALREADY_EXISTS: 'Scorecard already exists'
  }
  ,
  DOCUMENT_REQUEST: {
    CREATE: 'Document request is created..!!',
    NOT_FOUND: 'Document request not found..!!',
    DATA_FETCHED: 'Document request data fetched..!!'
  },
};


module.exports = {messages}