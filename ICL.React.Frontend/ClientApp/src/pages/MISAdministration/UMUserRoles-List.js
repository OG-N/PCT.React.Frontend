import React, { useState, useContext } from "react";
import { PermissionsContext } from "../../App";
import { useLocation } from 'react-router-dom';
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box,
    Alert,
    Checkbox,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { geticl_role } from "../../api/icl_role";
import { geticl_user } from "../../api/icl_user";
import { useTranslation } from 'react-i18next';
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

import { useNavigate } from "react-router-dom";
import {
    Plus as PlusIcon,
    CheckCircle as CheckCircleIcon,
    XCircle as XCircleIcon,
    Save as SaveIcon,
} from "react-feather";

const UMUserRolesList = () => {
    // Access to user data
    const {
        data: userData,
        isLoading: userLoading,
        isError: userError,
        error: userErrorData,
        refetch: userRefetch,
    } = useQuery(["geticl_user"], geticl_user);

    // Access to roles data
    const {
        data: rolesAData,
        isLoading: rolesALoading,
        isError: rolesAError,
        error: rolesAErrorData,
        refetch: rolesARefetch,
    } = useQuery(["geticl_role"], geticl_role);

    let users = [];
    if (!userLoading && !userError && userData) {
        users = userData.data.filter((user) => !user.isDeleted);
    }

    const [rolesAs, setRolesA] = React.useState([]);
    const [selectedUserCard, setSelectedUserCard] = React.useState(null);

    //Filter page options based on permissions
    const CreateUpdatePermissions = useContext(PermissionsContext);
    const location = useLocation();
    const currentPath = location.pathname.replace(/\//g, "", "");
    const CreatePermissions = CreateUpdatePermissions.filter((permission) => permission.route.replace(/\//g, "", "") === currentPath && permission.category === "Write");
    const UpdatePermissions = CreateUpdatePermissions.filter((permission) => permission.route.replace(/\//g, "", "") === currentPath && permission.category === "Update");
    const showCreate = CreatePermissions && CreatePermissions.length > 0;
    const showUpdateAndDelete = UpdatePermissions && UpdatePermissions.length > 0;

    React.useEffect(() => {
        if (!rolesALoading && !rolesAError && rolesAData) {
            const updatedRolesA = rolesAData.data
                .filter((role) => !role.isDeleted)
                .map((role) => ({
                    ...role,
                    roleid: role.id,
                    id: null,
                    enabled: false,
                    userid: null,
                }));
            setRolesA(updatedRolesA);
            if (selectedUser) {
                handleUserChange({ target: { value: selectedUser } });
            }
        }
    }, [rolesALoading, rolesAError, rolesAData]);

    const handlePermissionChange = (event, params) => {
        const field = params.field;
        const { checked } = event.target;

        const updatedRolesA = rolesAs.map((role, index) => {
            if (role.roleid === params.id) {
                return {
                    ...role,
                    [field]: checked,
                };
            }
            return role;
        });
        setRolesA(updatedRolesA);
    };

    const handleSaveChanges = async () => {
        if (!selectedUser) {
            setErrorMessage("Please select a user.");
            return;
        }
        const userRolesNew = rolesAs
            .filter((role) => role.id === null)
            .map(({ id, ...rest }) => ({
                roleid: rest.roleid,
                enabled: rest.enabled,
                userid: selectedUser,
            }));

        const userRolesUpdate = rolesAs
            .filter((role) => role.id !== null)
            .map((rest) => ({
                id: rest.id,
                roleid: rest.roleid,
                enabled: rest.enabled,
                userid: selectedUser,
            }));

        try {
            if (userRolesNew.length > 0) {
                await newicl_user_role_batch(userRolesNew);
            }
            if (userRolesUpdate.length > 0) {
                await updateicl_user_role_batch(userRolesUpdate);
            }
            setSuccessMessage("Changes saved successfully.");
        } catch (error) {
            setErrorMessage("Error saving changes. Please try again.");
        }
    };

    const handleUserChange = async (event) => {
        const userid = event.target.value;
        setSelectedUser(userid);
        const user = users.find((user) => user.id === userid);
        setSelectedUserCard(user);

        //disable box:
        setSearchText(user.email);
        setFilteredUsers([]);

        if (userid) {
            try {
                const userRolesData = await geticl_user_role_byuser(userid);
                const updatedRolesA = rolesAs.map((role) => {
                    const userRole = userRolesData.data.find((option) => option.roleId === role.roleid);
                    if (userRole) {
                        return {
                            ...role,
                            id: userRole.id,
                            enabled: userRole.enabled
                        };
                    } else {
                        return {
                            ...role,
                            id: null,
                            enabled: false
                        };
                    }
                });
                setRolesA(updatedRolesA);
            } catch (error) {
                console.error(error);
            }
        } else {
            const updatedRolesA = rolesAs.map((role) => ({
                ...role,
                id: null,
                enabled: false
            }));
            setRolesA(updatedRolesA);
        }
    };


    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    React.useEffect(() => {
        if (errorMessage) {
            const timeoutId = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [errorMessage]);
    React.useEffect(() => {
        if (successMessage) {
            const timeoutId = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [successMessage]);

    const sortedRolesAs = [...rolesAs].sort((a, b) =>
        a.category === "Internal" && b.category !== "Internal" ? -1 : 1
    );

    const [searchText, setSearchText] = React.useState('');
    const [filteredUsers, setFilteredUsers] = React.useState([]);
    const [selectedUser, setSelectedUser] = React.useState(null);
    const listRef = React.useRef(null);

    const handleSearchChange = (event) => {
        const searchText = event.target.value;
        setSearchText(searchText);

        const filteredUsers = users.filter(
            (user) =>
                user.email.toLowerCase().includes(searchText.toLowerCase()) ||
                user.fullname.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredUsers(filteredUsers);
    };
    const { t } = useTranslation();
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom style={{ color: "darkblue", fontWeight: "bold", borderBottom: "1px solid lightgray", paddingBottom: "8px" }}>
                            {t('Roles Assignment')}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 165, 0, 0.05)',
                                borderRadius: '4px',
                                border: '1px solid rgba(180, 155, 10, 1)',
                            }}
                        >
                            <input
                                type="text"
                                style={{
                                    width: '100%',
                                    border: 'none',
                                    fontWeight: 'bold',
                                    padding: '8px',
                                    backgroundColor: 'rgba(255, 165, 0, 0.05)',
                                }}
                                placeholder="Search user..."
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </Grid>

                    {filteredUsers.length > 0 && (
                        <Grid item xs={12}>
                            <div
                                ref={listRef}
                                style={{
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    marginTop: '8px',
                                    border: '1px solid rgba(180, 155, 10, 1)',
                                    borderRadius: '4px',
                                }}
                            >
                                {filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        onClick={() => handleUserChange({ target: { value: user.id } })}
                                        style={{
                                            cursor: 'pointer',
                                            padding: '8px',
                                            backgroundColor: user.id === selectedUser ? 'lightblue' : 'transparent',
                                        }}
                                    >
                                        {user.email}  ({user.fullName})
                                    </div>
                                ))}
                            </div>
                        </Grid>
                    )}

                    {selectedUserCard && (
                        <Grid item xs={12}>
                          <Card variant="outlined" style={{ maxWidth: '450px', borderWidth: '2px', borderColor: 'black' }}>
                            <CardContent>
                                    <Typography variant="h5" gutterBottom style={{ marginBottom: '16px' }}>
                                {t('User Information')}
                              </Typography>
                              <div style={{ display: 'flex', marginBottom: '16px' }}>
                                <Typography variant="body1" style={{ fontWeight: 'bold', width: '100px' }}>
                                  {t('Full Name:')}
                                </Typography>
                                <Typography variant="body1">{selectedUserCard.fullName}</Typography>
                              </div>
                              <div style={{ display: 'flex' }}>
                                <Typography variant="body1" style={{ fontWeight: 'bold', width: '100px' }}>
                                  {t('Email:')}
                                </Typography>
                                <Typography variant="body1">{selectedUserCard.email}</Typography>
                              </div>
                            </CardContent>
                          </Card>
                        </Grid>

                    )}

                    <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                            {t('Roles selection:')}
                        </Typography>
                        {sortedRolesAs.length > 0 ? (
                            <div style={{ height: 700, width: "100%" }}>
                                <DataGrid
                                    rows={sortedRolesAs}
                                    columns={[
                                        { field: "roleid", headerName: "roleid", width: 100, hide: true },
                                        {
                                            field: "category",
                                            headerName: "Category",
                                            width: 200,
                                            headerClassName: "headerCell",
                                            renderCell: (params) => (
                                                <Typography
                                                    variant="body1"
                                                    style={{
                                                        fontWeight: params.value === "Internal" ? 700 : 400,
                                                        color: params.value === "Internal" ? "darkblue" : "black",
                                                    }}
                                                >
                                                    {params.value}
                                                </Typography>
                                            ),
                                        },
                                        { field: "name", headerName: "Name", width: 200, headerClassName: "headerCell" },
                                        { field: "id", headerName: "Id", width: 100, hide: true },
                                        {
                                            field: "enabled",
                                            headerName: "",
                                            width: 180,
                                            headerClassName: "headerCell",
                                            renderCell: (params) => (
                                                <Checkbox
                                                    checked={params.value}
                                                    color="primary"
                                                    onChange={(event) => handlePermissionChange(event, params)}
                                                />
                                            ),
                                        }
                                    ]}
                                    getRowId={(row) => row.roleid}
                                    sx={{
                                        boxShadow: 1,
                                        '& .headerCell': {
                                            'font-size': 'medium',
                                            'text-decoration': 'underline',
                                        },
                                    }}
                                />
                            </div>
                        ) : (
                            <Typography variant="body2">
                                {t('No roles available.')}
                            </Typography>
                        )}
                    </Grid>
                    {successMessage && (
                        <Grid item xs={12}>
                            <Box mt={2}>
                                <Alert severity="success">{successMessage}</Alert>
                            </Box>
                        </Grid>
                    )}
                    {errorMessage && (
                        <Grid item xs={12}>
                            <Box mt={2}>
                                <Alert severity="error">{errorMessage}</Alert>
                            </Box>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<SaveIcon />}
                            onClick={handleSaveChanges}
                            style={{ marginTop: "16px", display: showCreate ? "inline-flex" : "none" }}
                        >
                            {t('Save Changes')}
                        </Button>
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );

};

export default UMUserRolesList;
