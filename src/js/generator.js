const allCharsets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz'.split(),
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(),
    numbers: '0123456789'.split(),
    symbols: '`~!@#$%^&*-_=+'.split(),
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

function getRandomChars(charset, count) {
    const length = charset.length;
    let result = '';

    for (let i = 0; i < count; i++)
        result += charset.charAt(Math.floor(Math.random() * length));

    return result;
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

    // TODO: Make sure we have at least one character from each group

    return getRandomChars(charsets.join(''), config.length);
}

export default generatePassword;
