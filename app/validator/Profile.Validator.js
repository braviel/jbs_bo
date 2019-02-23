'use strict';
const BaseJoi = require('joi');
const DateExtension = require('joi-date-extensions');
const Joi = BaseJoi.extend(DateExtension);

module.exports = {
    onCreateValidator: Joi.object({
        ProfileUID: Joi.string().required(),
        ProfilePhone: Joi.string(),
        ProfileEmail: Joi.string().email(),
        ProfileUEN: Joi.string(),
        ProfileLogo: Joi.binary().optional(),
        CommonName: Joi.string(),
        FirstName: Joi.string(),
        LastName: Joi.string(),
        DateOfBirth: Joi.date().format('DD-MM-YYYY'),
        Gender: Joi.string(),
        BuildingName: Joi.string(),
        Address1: Joi.string(),
        Address2: Joi.string(),
        PostalCode: Joi.string(),
        DrivingLicenseClass: Joi.string(),
        DrivingLicenseDate: Joi.date().format('DD-MM-YYYY'),
        Religion: Joi.string(),
        CityCode: Joi.string(),
        CountryCode: Joi.string()
    }),
    onUpdateValidator: Joi.object({
        ProfileUID: Joi.string().optional(),
        ProfilePhone: Joi.string().optional(),
        ProfilePhone: Joi.string(),
        ProfileEmail: Joi.string().email(),
        ProfileUEN: Joi.string(),
        ProfileLogo: Joi.binary().optional(),
        CommonName: Joi.string(),
        FirstName: Joi.string(),
        LastName: Joi.string(),
        DateOfBirth: Joi.date().format('DD-MM-YYYY'),
        Gender: Joi.string(),
        BuildingName: Joi.string(),
        Address1: Joi.string(),
        Address2: Joi.string(),
        PostalCode: Joi.string(),
        DrivingLicenseClass: Joi.string(),
        DrivingLicenseDate: Joi.date().format('DD-MM-YYYY'),
        Religion: Joi.string(),
        CityCode: Joi.string(),
        CountryCode: Joi.string()
    })
}