export const passwordValidation = (value: string) => {
    return /^.{8,}$/.test(value);
}
export const siteValidation = (value: string) => {
    const isValidURL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/;
    return isValidURL.test(value);
}

export const fullNameValidation = (value: string) => {
    return /^[A-Za-z\s\.'-]*$/.test(value);
}
export const telValidation = (value: string) => {
    return /^\+?[0-9\s\-]+$/.test(value);
}
export const emailValidation = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
