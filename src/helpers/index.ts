export const verifyRegex = (regex: RegExp, value: string): boolean => regex.test(value)

export const REGEX_NUM = /^[0-9]*$/