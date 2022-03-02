import { AuthProvider } from 'react-admin';

localStorage.setItem('username', 'Rebecca Xi');

export const authProvider = {
    login: ({ username }) => {
        localStorage.setItem('username', username);
        // accept all username/password combinations
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.reject('Unknown method'),
    getIdentity: () =>
        Promise.resolve({
            id: 0,
            fullName: 'Rebecca Xi',
            avatar:
                'https://media-exp1.licdn.com/dms/image/C4E03AQGFt5tQWfd6wA/profile-displayphoto-shrink_400_400/0/1630535638334?e=1651708800&v=beta&t=Zz2BXF1ZZ_tG_riWGCfGVOIFOLnLyGvE1OVzUjAtwVY',
        }),
};
