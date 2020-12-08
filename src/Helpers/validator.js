export const isEmpty = (value) => {
    if (value === '' || value === null) return {valid: false, err: `Заполните поле`};

    return {valid: true, err: ''};
};

export const validateString = (value, minLen = 1, maxLen = 255) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    if (value.length < minLen) return {valid: false, err: `Минимальная длина поля ${minLen} символов`};
    if (value.length > maxLen) return {valid: false, err: `Максимальная длина поля ${maxLen} символов`};

    return {valid: true, err: ''};
};

export const validateNumber = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    if (isNaN(value)) return {valid: false, err: `Введите число`};

    return {valid: true, err: ''};
};

export const validateUsername = (value, minLen = 3, maxLen = 30) => {
    const validator = validateString(value, minLen, maxLen);
    if (validator.valid === false) return validator;

    const pattern = /^[a-z0-9_-]{3,30}$/; // may include _ and – having a length of 3 to 16 characters –

    if (!pattern.test(value)) return {valid: false, err: `Имя пользователя может включать _ и -, длиной от 3 до 16 символов`};

    return {valid: true, err: ''};
};

export const validateEmail = (value) => {
    const validator = validateString(value);
    if (validator.valid === false) return validator;

    const pattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

    if (!pattern.test(value)) return {valid: false, err: `Неверный e-mail`};

    return {valid: true, err: ''};
};

export const validatePassword = (value) => {
    const validator = validateString(value, 8);
    if (validator.valid === false) return validator;

    // const complexPasswordPattern = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/; // Should have 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be at least 8 characters long
    const moderatePasswordPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/; // Should have 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long

    if (!moderatePasswordPattern.test(value)) return {valid: false, err: `Пароль должен состоять из 1 строчной буквы, 1 прописной буквы, 1 цифры и состоять не менее чем из 8 символов`};

    return {valid: true, err: ''};
};

export const validateHttpsURL = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;

    if (!pattern.test(value)) return {valid: false, err: `Неверная ссылка, протокол ссылки должен содержать https`};

    return {valid: true, err: ''};
};

export const validateHttpURL = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /http?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/;

    if (!pattern.test(value)) return {valid: false, err: `Неверная ссылка, протокол ссылки должен содержать http`};

    return {valid: true, err: ''};
};

export const validateOptionalURL = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

    if (!pattern.test(value)) return {valid: false, err: `Неверная ссылка`};

    return {valid: true, err: ''};
};

export const validateIPv4 = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

    if (!pattern.test(value)) return {valid: false, err: `Неверный IPv4 адрес`};

    return {valid: true, err: ''};
};

export const validateIPv6 = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/;

    if (!pattern.test(value)) return {valid: false, err: `Неверный IPv6 адрес`};

    return {valid: true, err: ''};
};

export const validateIPv4IPv6 = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

    if (!pattern.test(value)) return {valid: false, err: `Адрес должен быть IPv4 или IPv6`};

    return {valid: true, err: ''};
};

export const validateDateYMD = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/; // Date Format YYYY-MM-dd

    if (!pattern.test(value)) return {valid: false, err: `Дата должна быть введена в формате YYYY-MM-dd используя разделитель -`};

    return {valid: true, err: ''};
};

export const validateDateDMY = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    /* Date Format dd-MM-YYYY or
               dd.MM.YYYY or
               dd/MM/YYYY
   with check for leap year */
    const pattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    if (!pattern.test(value)) return {valid: false, err: `Дата должна быть введена в формате dd-MM-YYYY используя разделитель - или . или /`};

    return {valid: true, err: ''};
};

export const validateDateDMlongY = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    /* Date Format dd-mmm-YYYY or
               dd/mmm/YYYY or
               dd.mmm.YYYY */
    const pattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

    if (!pattern.test(value)) return {valid: false, err: `Дата должна быть введена в формате dd-mmm-YYYY используя разделитель - или . или /`};

    return {valid: true, err: ''};
};

export const validateTimeHM12 = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/; // Time Format HH:MM 12-hour, optional leading 0

    if (!pattern.test(value)) return {valid: false, err: `Время должно быть введено в формате HH:MM 12-hour`};

    return {valid: true, err: ''};
};

export const validateTimeHM12AMPM = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/; // Time Format HH:MM 12-hour, optional leading 0, Meridiems (AM/PM)

    if (!pattern.test(value)) return {valid: false, err: `Время должно быть введено в формате HH:MM 12-hour AM/PM`};

    return {valid: true, err: ''};
};

export const validateTimeHM24 = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; // Time Format HH:MM 24-hour, optional leading 0

    if (!pattern.test(value)) return {valid: false, err: `Время должно быть введено в формате HH:MM 24-hour`};

    return {valid: true, err: ''};
};

export const validateTimeHMS24 = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/; // Time Format HH:MM:SS 24-hour

    if (!pattern.test(value)) return {valid: false, err: `Время должно быть введено в формате HH:MM:SS 24-hour`};

    return {valid: true, err: ''};
};

export const validateHTMLTag = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /<\/?[\w\s]*>|<.+[\W]>/; // Time Format HH:MM:SS 24-hour

    if (!pattern.test(value)) return {valid: false, err: `Не является html тегом`};

    return {valid: true, err: ''};
};

export const validateInternationalPhone = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/;

    if (!pattern.test(value)) return {valid: false, err: `Неверный формат телефона`};

    return {valid: true, err: ''};
};

export const validateVisaCard = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /^4[0-9]{12}(?:[0-9]{3})?$/; // All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13.

    if (!pattern.test(value)) return {valid: false, err: `Неверный номер карты`};

    return {valid: true, err: ''};
};

export const validateMasterCard = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/; // MasterCard numbers either start with the numbers 51 through 55 or with the numbers 2221 through 2720. All have 16 digits.

    if (!pattern.test(value)) return {valid: false, err: `Неверный номер карты`};

    return {valid: true, err: ''};
};

export const validateAmericanExpressCard = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    const pattern = /^3[47][0-9]{13}$/; // American Express card numbers start with 34 or 37 and have 15 digits.

    if (!pattern.test(value)) return {valid: false, err: `Неверный номер карты`};

    return {valid: true, err: ''};
};

export const validateDinersClubCard = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    /*
        Diners Club card numbers begin with 300 through 305, 36 or 38. All have 14 digits. There are Diners Club cards that begin with 5 and have 16 digits.
        These are a joint venture between Diners Club and MasterCard, and should be processed like a MasterCard.
     */
    const pattern = /^3[47][0-9]{13}$/;

    if (!pattern.test(value)) return {valid: false, err: `Неверный номер карты`};

    return {valid: true, err: ''};
};

export const validateDiscoverCard = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    /*
        Discover card numbers begin with 6011 or 65. All have 16 digits.
     */
    const pattern = /^6(?:011|5[0-9]{2})[0-9]{12}$/;

    if (!pattern.test(value)) return {valid: false, err: `Неверный номер карты`};

    return {valid: true, err: ''};
};

export const validateJCBCard = (value) => {
    const validator = isEmpty(value);
    if (validator.valid === false) return validator;

    /*
        JCB cards beginning with 2131 or 1800 have 15 digits. JCB cards beginning with 35 have 16 digits.
     */
    const pattern = /^(?:2131|1800|35\d{3})\d{11}$/;

    if (!pattern.test(value)) return {valid: false, err: `Неверный номер карты`};

    return {valid: true, err: ''};
};