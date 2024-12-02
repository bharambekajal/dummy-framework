
const emailTemplates = {
    registration: {
      subject: 'Complete Your Registration',
      htmlContent: (link) => `
        <p>Click <a href="${link}" target="_blank" rel="noopener noreferrer">
        here</a> to complete your registration.</p>`
    },
    login: {
      subject: 'Login to Your Account',
      htmlContent: (link) => `
        <p>Click <a href="${link}" target="_blank" rel="noopener noreferrer">
        here</a> to log in to your account.</p>`
    },
    passwordReset: {
      subject: 'Reset Your Password',
      htmlContent: (link) => `
        <p>Click <a href="${link}" target="_blank" rel="noopener noreferrer">
        here</a> to reset your password.</p>`
    },
 
  };
  
  module.exports = emailTemplates;