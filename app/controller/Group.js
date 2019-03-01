'use strict';
const Boom = require('boom');

module.exports = (db) => {
    const Group = db.getModel('Group');    
    return {
        validate: async function(group) {
            let passed = false;
            const City = db.getModel('City');
            const Country = db.getModel('Country');
            const Company = db.getModel('Company');
            const Department = db.getModel('Department');
            try{                
                if(group.CountryCode != null) {
                    const country = await Country.findByPk(group.CountryCode);
                    if(country === null) {
                        throw Boom.notFound(`Can not find Country with id ${group.CountryCode}`);
                    }
                }
                if(group.CityCode != null) {
                    const city = await City.findByPk(group.CityCode);
                    if(city === null) {
                        throw Boom.notFound(`Can not find City with id ${group.CityCode}`);
                    }
                }
                if(group.CompanyUID != null) {
                    const company = await Company.findByPk(group.CompanyUID);
                    if(city === null) {
                        throw Boom.notFound(`Can not find City with id ${group.CityCode}`);
                    }
                }
                if(group.DepartmentUID != null) {
                    const department = await Department.findByPk(group.DepartmentUID);
                    if(department === null) {
                        throw Boom.notFound(`Can not find City with id ${group.CityCode}`);
                    }
                }
                passed = true;
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message);
            }
            return passed;
        },
        list: async function(opt) {
            let groups
            try {
                groups = await Group.findAll();
            } catch (err) {
                console.error(err);
                throw err;
            }
            return groups;
        },
        listByMemberId: async function(profileUID) {
            const GroupMember = db.getModel('GroupMember');
            let groups
            try {
                groups = await Group.findAll({
                    include: [{
                        model: GroupMember,
                        where: {
                            ProfileUID: profileUID
                        }
                    }]
                });
                // groups = await GroupMember.findAll({
                //     where: {
                //         ProfileUID: profileUID
                //     },
                //     include: [{
                //         model: Group                        
                //     }]
                // });
            } catch (err) {
                console.error(err);
                throw err;
            }
            return groups;
        },
        get: async function(id) {
            let group;
            try{
                group = await Group.findByPk(id);
                if (group === null) throw Boom.notFound();
            } catch(err) {
                console.error(err);
                throw Boom.notFound(err.message);
            }
            return group.get();
        },
        create: async function (obj, profileUID) {
            let group;
            const Profile = db.getModel('Profile');
            const profile = await Profile.findByPk(profileUID);
            if(profile === null) throw Boom.notFound(`Can not find Prodile with ID: ` + profileUID);
            await this.validate(obj);
            const GroupMember = db.getModel('GroupMember');            
            try {
                group = await Group.create(obj);
                const groupMember = await GroupMember.create({
                        GroupAdmin: 'Y',
                        ProfileUID: profile.ProfileUID,
                        GroupUID: group.GroupUID
                    });
            } catch(err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return group;
        },
        delete: async function (id) {
            let result;
            try{
                const group = await Group.findByPk(id);
                if (group === null) throw Boom.notFound();
                result = await Group.destroy({
                    where: {GroupUID: id}
                });
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message);
            }
            return result;
        },
        update: async function(id, obj) {
            let result;
            try{
                const group = await Group.findByPk(id);
                if (group === null) throw Boom.notFound(`Can not find Group with id "${id}"`);
                obj.ProfileUID = id;
                await this.validate(obj);            
                result = await group.update(obj);
            } catch (err) {
                console.log(err);
                throw err;
            }
            return result;
        },
    }
}