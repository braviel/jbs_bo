'use strict';
const Joi = require('joi');
module.exports = {
    onCreateValidator: Joi.object({
        CompanyUID: Joi.string().required(),
        CompanyPhone: Joi.string(),
        CompanyEmail: Joi.string(),
        CompanyUEN: Joi.string(),
        CompanyLogo: Joi.binary().optional(),
        CompanyName: Joi.string(),
        BuildingName: Joi.string(),
        Address1: Joi.string(),
        Address2: Joi.string(),
        PostalCode: Joi.string(),
        CityCode: Joi.string().required(),
        CountryCode: Joi.string().required()
    }),
    onUpdateValidator: Joi.object({
        CompanyPhone: Joi.string(),
        CompanyEmail: Joi.string(),
        CompanyUEN: Joi.string(),
        CompanyLogo: Joi.binary(),
        CompanyName: Joi.string(),
        BuildingName: Joi.string(),
        Address1: Joi.string(),
        Address2: Joi.string(),
        PostalCode: Joi.string(),
        CityCode: Joi.string(),
        CountryCode: Joi.string()
    })
}