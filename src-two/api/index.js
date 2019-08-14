import axisoInstance from './ajax';

export const reqLogin = (username,password) =>axisoInstance.post ('/login',{username,password});

