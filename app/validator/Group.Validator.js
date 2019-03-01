'use strict';
const BaseJoi = require('joi');
const DateExtension = require('joi-date-extensions');
const Joi = BaseJoi.extend(DateExtension);

module.exports = {
    onCreateValidator: Joi.object({
        GroupName: Joi.string(),
        GroupPhone: Joi.string(),
        GroupEmail: Joi.string().email(),
        GroupLogoURL: Joi.string().optional(),
        GroupLogo: Joi.binary().optional(),
        BuildingName: Joi.string(),
        Address1: Joi.string(),
        Address2: Joi.string(),
        PostalCode: Joi.string(),
        CountryCode: Joi.string(),
        CityCode: Joi.string(),
        CompanyUID: Joi.string(),
        DepartmentUID: Joi.string(),
    }),
    onUpdateValidator: Joi.object({
        GroupUID: Joi.string().required(),
        GroupName: Joi.string(),
        GroupPhone: Joi.string(),
        GroupEmail: Joi.string().email(),
        GroupLogoURL: Joi.string().optional(),
        GroupLogo: Joi.binary().optional(),
        BuildingName: Joi.string(),
        Address1: Joi.string(),
        Address2: Joi.string(),
        PostalCode: Joi.string(),
        CountryCode: Joi.string(),
        CityCode: Joi.string(),
        CompanyUID: Joi.string().optional(),
        DepartmentUID: Joi.string().optional(),
    })
}