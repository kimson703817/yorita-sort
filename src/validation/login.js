const validator = require('validator');
const isEmpty = require('./isEmpty');

const checkMissingData = (data) => {
    let errors = {};

    !isEmpty(data.email) ?
        errors = errors :
        errors.email = 'Email is required.';

    !isEmpty(data.password) ?
        errors = errors :
        errors.password = 'Please enter your password.';

    return errors;
}

module.exports = (data) => {
    let errors = checkMissingData(data);

    if(!isEmpty(errors)) {
        return errors;
    }

    if(!validator.isEmail(data.email)) {
        errors.email = 'Please enter a valid email';
    }

    if(!isEmpty(errors)) {
        return errors;
    }

    return null;
};