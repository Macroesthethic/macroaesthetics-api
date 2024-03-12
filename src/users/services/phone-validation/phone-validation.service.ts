import { Injectable } from '@nestjs/common';
import { PhoneNumberUtil } from 'google-libphonenumber';


@Injectable()
export class PhoneValidationService {
    private phoneNumberUtil : PhoneNumberUtil

    constructor() {
        this.phoneNumberUtil = PhoneNumberUtil.getInstance();
    }

    validateNumber(phoneNumber: string, countryCode: string) {
        try {
            const number = this.phoneNumberUtil.parse(phoneNumber, countryCode);
            return this.phoneNumberUtil.isValidNumber(number);
        } catch (error) {
            return false;
        }
    }

}
