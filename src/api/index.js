import axisoInstance from './ajax';

export const reqLogin = ( username, password ) =>axisoInstance.post ('/login',{username,password});

export const reqValidateUser = (id) => axisoInstance.post('validate/user',{id});