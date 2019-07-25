const allCharsets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '`~!@#$%^&*-_=+',
}

export const defaultConfig = {
    length: 16,
    charsets: {
        lowercase: true,
        uppercase: true,
        numbers: true,
        symbols: false,
    },
}

export const sanitizeConfig = function(config) {
    const result = Object.assign({}, defaultConfig);

    if ('length' in config) {
        const length = parseInt(config.length);
        if (length >= 4 && length <= 30)
            result.length = length;
    }

    if ('charsets' in config) {
        for (const key of Object.keys(result.charsets)) {
            if (key in config.charsets)
                result.charsets[key] = !!config.charsets[key];
        }
    }

    return result;
}

function getRandomNumber() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0];
}

function getRandomChars(charset, count) {
    const length = charset.length;
    let result = '';

    for (let i = 0; i < count; i++)
        result += charset.charAt(getRandomNumber() % length);

    return result;
}

function isValidPassword(value, charsets) {
    // Make sure we have at least one character from each group

    for (let charset of charsets) {
        let found = false;

        for (let char of charset) {
            if (value.indexOf(char) > -1) {
                found = true;
                break;
            }
        }

        if (!found) {
            return false;
        }
    }

    return true;
}

function generatePassword(config) {
    config = Object.assign({}, defaultConfig, config);

    // Gather the charsets we want to use
    let charsets = [];
    for (const key of Object.keys(allCharsets)) {
        if (config.charsets[key])
            charsets.push(allCharsets[key]);
    }

    if (charsets.length === 0)
        return '';

    let result;

    do {
        result = getRandomChars(charsets.join(''), config.length);
    } while (!isValidPassword(result, charsets));

    return result;
}

export default generatePassword;
