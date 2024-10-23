export const ROUTES = {
    HOME: '/',
    EMPTY: '',
    SERVER_ERROR: '/server_error',
    USER: {
        LOGIN: '/portal/login/:userId',
        SIGNUP: '/portal/signup/:userId',
        PROFILE: '/user/profile/:id',
        FORGOT_PASSWORD: 'forgot-password',
        RESET_PASSWORD: 'reset-password/:id/:token',
    },
    ADMIN: {
        LOGIN: '/admin/login',
        DASHBOARD: '/admin/dashboard',
        CLIENTFORM: 'client_form',
        CLIENTLIST: 'client_list',
    },
};
