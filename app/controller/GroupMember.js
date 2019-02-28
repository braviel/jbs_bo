'use strict';
const Boom = require('boom');

module.exports = (db) => {
    const Group = db.getModel('Group');
    const GroupMember = db.getModel('GroupMember');
    const Member = db.getModel('Profile');
    return {
        validate: async function(groupMember) {
            let passed = false;
            const Member = db.getModel('Profile');
            const Group = db.getModel('Group');
            try{                
                if(groupMember.ProfileUID != null) {
                    const member = await Member.findByPk(groupMember.ProfileUID);
                    if(member === null) {
                        throw Boom.notFound(`Can not find member with id ${groupMember.ProfileUID}`);
                    }
                }
                if(groupMember.GroupUID != null) {
                    const group = await Group.findByPk(groupMember.GroupUID);
                    if(group === null) {
                        throw Boom.notFound(`Can not find group with id ${group.CityCode}`);
                    }
                }                
                passed = true;
            } catch (err) {
                console.error(err);
                throw Boom.badImplementation(err.message);
            }
            return passed;
        },
        listGroupByMemberId: async function(memberUID, opt) {
            let groups
            try {
                groups = await Group.findAll();
            } catch (err) {
                console.error(err);
                throw err;                
            }
            return groups;
        },
        listMemberByGroupId: async function(GroupUID, opt) {
            let groups
            try {
                groups = await Group.findAll();
            } catch (err) {
                console.error(err);
                throw err;                
            }
            return groups;
        },
        // get: async function(id) {
        //     let groupMember;
        //     try{
        //         groupMember = await GroupMember.findByPk(id);
        //         if (groupMember === null) throw Boom.notFound();
        //     } catch(err) {
        //         console.error(err);
        //         throw Boom.notFound(err.message);
        //     }
        //     return groupMember.get();
        // },
        create: async function (obj) {
            let created;
            await this.validate(obj);
            try {
                created = await Group.create(obj);
            } catch(err) {
                console.error(err);
                throw Boom.badImplementation(err.message, err);
            }
            return created;
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