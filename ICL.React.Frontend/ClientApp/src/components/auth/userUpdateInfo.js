import React from "react";
import {
    geticl_user,
    geticl_user_byid,
    newicl_user,
    updateicl_user,
    deleteicl_user,
} from "../../api/icl_user";
import {
    geticl_role,
    geticl_role_byname,
    newicl_role,
    updateicl_role,
    deleteicl_role,
} from "../../api/icl_role";
import {
    geticl_user_role,
    geticl_user_role_byid,
    geticl_user_role_byuser,
    geticl_user_role_byrole,
    newicl_user_role_batch,
    newicl_user_role,
    updateicl_user_role_batch,
    updateicl_user_role,
    deleteicl_user_role,
} from "../../api/icl_user_role";
import { useMutation, useQuery } from "@tanstack/react-query";

export const userUpdateInfo = async (user) => {
    if (!user || !user.idTokenClaims || !user.idTokenClaims.roles || user.idTokenClaims.roles.length === 0) {
        return;
    }
    const roles = user.idTokenClaims.roles;
    try {
        const userId = await checkUserExistence(user);
        const updatedRoles = await checkRoleExistence(roles);
        await updateUserRoles(userId, updatedRoles);
    } catch (error) {
        console.error("An error occurred:", error);
    }

};

const checkUserExistence = async (user) => {
    const userId = user.idTokenClaims.oid;
    const existingUser = await geticl_user_byid(userId);

    if (!existingUser || !existingUser.data) {
        await createUser(user);
    }

    return userId;
};

const checkRoleExistence = async (roles) => {
    const updatedRoles = [];

    for (let i = 0; i < roles.length; i++) {
        const roleName = roles[i];
        const existingRole = await geticl_role_byname(roleName);

        if (!existingRole || !existingRole.data) {
            const createdRole = await createRole(roleName);
            updatedRoles.push(createdRole.data);
        } else {
            updatedRoles.push(existingRole.data);
        }
    }

    return updatedRoles;
};

const createUser = async (user) => {
    const newUser = {
        fullName: user.name,
        email: user.username,
        id: user.idTokenClaims.oid,
    };

    await newicl_user(newUser);
};

const createRole = async (roleName) => {
    const newRole = {
        Category: "Imported",
        Name: roleName,
    };

    return await newicl_role(newRole);
};

//this method will force the assignment of users and roles in Azure to be reflected in the Database
const updateUserRoles = async (userId, roles) => {
    const existingUserRoles = await geticl_user_role_byuser(userId);

    if (existingUserRoles && existingUserRoles.data) {
        const existingRoles = existingUserRoles.data.map((userRole) => userRole.roleId);
        const newFoundRoles = roles.map((userRole) => userRole.id);

        const newRoles = roles.filter((role) => !existingRoles.includes(role.id));
        const updatedRoles = roles.filter((role) =>
            existingRoles.includes(role.id) && !existingUserRoles.data.find((userRole) => userRole.roleId === role.id)?.enabled
        );
        const removedRoles = existingUserRoles.data.filter((userRole) =>
            !newFoundRoles.includes(userRole.roleId) && userRole.enabled
        );

        if (newRoles.length > 0) {
            const newRolesData = newRoles.map((role) => ({
                userid: userId,
                roleid: role.id,
                enabled: true
            }));
            await newicl_user_role_batch(newRolesData);
        }

        if (updatedRoles.length > 0) {
            const updatedRolesData = updatedRoles.map((role) => ({
                userid: userId,
                roleid: role.id,
                enabled: true,
                id: existingUserRoles.data.find((userRole) => userRole.roleId === role.id).id
            }));
            await updateicl_user_role_batch(updatedRolesData);
        }

        if (removedRoles.length > 0) {
            const removedRolesData = removedRoles.map((userRole) => ({
                userid: userId,
                roleid: userRole.roleId,
                enabled: false,
                id: userRole.id
            }));
            await updateicl_user_role_batch(removedRolesData);
        }
    }
};
