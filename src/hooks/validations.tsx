import { REGEX_NUM, verifyRegex } from '@/helpers'
import Validator from 'validator'

export const useValidation = () => {
  const validatePhoneNumber = (value: string) =>
    (verifyRegex(REGEX_NUM, value) && value.length <= 10)

  const validateNumber = (value: string) => verifyRegex(REGEX_NUM, value)

  const validatePhoneNumberLength = (value: string) => value.length === 10

  const validateName = (value: string) => value.length <= 60

  const validateEmail = (value: string) => Validator.isEmail(value)

  return {
    validatePhoneNumber,
    validateName,
    validateEmail,
    validatePhoneNumberLength,
    validateNumber
  }
}
