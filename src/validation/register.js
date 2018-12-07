const validator = require('validator');
const isEmpty = require('./isEmpty');

const checkMissingData = (data) => {
    let errors = {};

    !isEmpty(data.username) ?
        errors = errors :
        errors.username = 'Username is required.';

    !isEmpty(data.email) ?
        errors = errors :
        errors.email = 'Email is required.';

    !isEmpty(data.password) ?
        errors = errors :
        errors.password = 'Please enter a valid password.';

    !isEmpty(data.password2) ?
        errors = errors :
        errors.password2 = 'Please confirm your password.';

    return errors;
}

module.exports = (data) => {
    let errors = checkMissingData(data);

    if(!isEmpty(errors)) {
        return errors;
    }

    if(!validator.isLength(data.username, {min: 2, max: 20})) {
        errors.username =
            'Username must be between 2 and 30 characters';
    }

    if(!validator.isEmail(data.email)) {
        errors.email = 'Please enter a valid email';
    }

    if(!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 
            'Password must be between 6-30 characters';
    }

    if(!validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password must match';
    }

    if(!isEmpty(errors)) {
        return errors;
    }

    return null;
};