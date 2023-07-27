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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    geticl_user,
    geticl_user_byid,
    newicl_user,
    updateicl_user,
    deleteicl_user,
} from "../../api/icl_user";

import { useNavigate } from "react-router-dom";
import {
    Plus as PlusIcon,
    CheckCircle as CheckCircleIcon,
    XCircle as XCircleIcon,
} from "react-feather";
import { useMsal } from "@azure/msal-react";
import { useTranslation } from 'react-i18next';

const UMUsersList = () => {
    const { data, isLoading, isError, error, refetch } = useQuery(
        ["geticl_user"],
        geticl_user
    );
    const [successMessage, setSuccessMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [selectedUser, setSelectedUser] = React.useState({});
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(5);

    const mutation = useMutation({
        mutationFn: async (updatedUser) => {
            try {
                await updateicl_user(updatedUser);
                setSuccessMessage("User information changed successfully.");
                refetch();
            } catch (error) {
                setErrorMessage("Error updating user information.");
                console.error("Error updating user information:", error);
            }
        },
    });

    //Filter page options based on permissions
    const CreateUpdatePermissions = useContext(PermissionsContext);
    const location = useLocation();
    const currentPath = location.pathname.replace(/\//g, "", "");
    const CreatePermissions = CreateUpdatePermissions.filter((permission) => permission.route.replace(/\//g, "", "") === currentPath && permission.category === "Write");
    const UpdatePermissions = CreateUpdatePermissions.filter((permission) => permission.route.replace(/\//g, "", "") === currentPath && permission.category === "Update");
    const showCreate = CreatePermissions && CreatePermissions.length > 0;
    const showUpdateAndDelete = UpdatePermissions && UpdatePermissions.length > 0;
    
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
        if (isError) {
            console.error("Error:", error);
        }
    }, [isError, error]);

    const handleDialogOpen = (user) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setSelectedUser(null);
        setDialogOpen(false);
    };

    const handleCreateDialogOpen = () => {
        setSelectedUser({});
        setCreateDialogOpen(true);
    };

    const handleCreateDialogClose = () => {
        setSelectedUser(null);
        setCreateDialogOpen(false);
    };

    const handleCreateNewUser = async () => {
        try {
            if (!selectedUser.fullName) {
                setErrorMessage("Please provide a value for the Full Name field.");
                return;
            }
            if (!selectedUser.email) {
                setErrorMessage("Please provide a value for the Email field.");
                return;
            }

            await newicl_user(selectedUser);
            setSuccessMessage("User created successfully.");
            refetch();
            setCreateDialogOpen(false);
        } catch (error) {
            setErrorMessage("Error creating user.");
            console.error("Error creating user:", error);
        }
    };

    const handleUpdateUser = () => {
        if (selectedUser) {
            if (!selectedUser.fullName) {
                setErrorMessage("Please provide a value for the Full Name field.");
                return;
            }
            mutation.mutate(selectedUser);
            setDialogOpen(false);
        }
    };

    const handleDeleteUser = async (id) => {
        if (
            window.confirm(
                "Are you sure you want to change the status of this user?"
            )
        ) {
            try {
                await deleteicl_user(id);
                setSuccessMessage("User status changed successfully.");
                refetch();
            } catch (error) {
                console.error("Error changing user status:", error);
            }
        }
    };

    const handleCreateUser = () => {
        setSelectedUser({});
        setCreateDialogOpen(true);
    };

    const columns = [
        { field: "fullName", headerName: "Full Name", width: 250, headerClassName: "headerCell" },
        {
            field: "email",
            headerName: "Email",
            width: 250,
            headerClassName: "headerCell",
        },
        {
            field: "id",
            headerName: "ID",
            width: 150,
            hide: true,
        },
        {
            field: "isDeleted",
            headerName: "Status",
            width: 150,
            headerClassName: "headerCell",
            renderCell: (params) => (
                <>
                    {params.value ? (
                        <div>
                            <XCircleIcon style={{ color: "red" }} />
                        </div>
                    ) : (
                        <div>
                            <CheckCircleIcon style={{ color: "green" }} />
                        </div>
                    )}
                </>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            headerClassName: "headerCell",
            hide: !showUpdateAndDelete,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleDialogOpen(params.row)}
                >
                    Edit
                </Button>
            ),
        },
        {
            field: "delete",
            headerName: "",
            hide: !showUpdateAndDelete,
            width: 150,
            sortable: false,
            headerClassName: "headerCell",
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleDeleteUser(params.row.id)}
                >
                    Delete/restore
                </Button>
            ),
        },
    ];

    const rows = isLoading || isError ? [] : data ? data.data : [];

    //const { instance } = useMsal();
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [errorAz, setErrorAz] = React.useState("");
    const [accounts, setAccounts] = React.useState([]);

    /*React.useEffect(() => {
        // Get existing accounts
        const currentAccounts = instance.getAllAccounts();
        setAccounts(currentAccounts);

        if (currentAccounts.length > 0) {
            console.log("Existing accounts:", currentAccounts);
        }

        // Acquire access token from Azure AD
        instance
            .acquireTokenSilent({
                scopes: ["https://graph.microsoft.com/.default"],
                account: currentAccounts[0] // Use the first account from the list
            })
            .then((response) => {
                console.log("Token acquired successfully:", response.accessToken);
                const accessToken = response.accessToken;

                // Make a call to Microsoft Graph API with the access token
                fetch("https://graph.microsoft.com/v1.0/users", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("User data obtained:", data);

                        if (data.error) {
                            setErrorAz(data.error.message);
                        } else {
                            setUsers(data.value);
                        }

                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log("Error obtaining user data:", error.message);
                        setErrorAz(error.message);
                    });
            })
            .catch((error) => {
                console.log("Error acquiring token:", error.message);
                setErrorAz(error.message);
            });
    }, []);*/
    const { t } = useTranslation();
    return (
        <Card>
            <CardContent>
                <Grid container spacing={12}>
                    <Grid item md={12}>
                        <Typography variant="h4" gutterBottom style={{ color: "darkblue", fontWeight: "bold", borderBottom: "1px solid lightgray", paddingBottom: "8px" }}>
                            {t('User Management - Users Information')}
                        </Typography>
                    </Grid>
                </Grid>
                <br />
                {isError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Error retrieving user information: {error.message}
                    </Alert>
                )}
                {successMessage && (
                    <Box mt={2}>
                        <Alert severity="success">{successMessage}</Alert>
                    </Box>
                )}
                {errorMessage && (
                    <Box mt={2}>
                        <Alert severity="error">{errorMessage}</Alert>
                    </Box>
                )}
                <Grid container spacing={6}>
                    <Grid item md={12}>
                        <div style={{ height: 600, width: "100%" }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={pageSize}
                                rowsPerPageOptions={[5, 10, 20]}
                                loading={isLoading}
                                onPageSizeChange={(params) => {
                                    setPageSize(params);
                                    refetch({ page: 1, pageSize: params });
                                }}
                                sx={{
                                    boxShadow: 1,
                                    '& .headerCell': {
                                        'font-size': 'medium',
                                        'text-decoration': 'underline',
                                    },
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" startIcon={<PlusIcon />}
                            onClick={handleCreateUser} style={{ marginTop: "16px", display: showCreate ? "inline-flex" : "none" }}
                        > {t('Create New User')} </Button>
                    </Grid>
                </Grid>
            </CardContent>

            {/* Dialog for editing user */}
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{t('Edit User')}</DialogTitle>
                <DialogContent>
                    {selectedUser && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="fullName"
                                    label="Full Name"
                                    type="text"
                                    fullWidth
                                    value={selectedUser.fullName ?? ""}
                                    onChange={(e) =>
                                        setSelectedUser({
                                            ...selectedUser,
                                            fullName: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="dense"
                                    id="email"
                                    label="Email"
                                    type="text"
                                    fullWidth
                                    value={selectedUser.email ?? ""}
                                    onChange={(e) =>
                                        setSelectedUser({ 
                                            ...selectedUser,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                    )}
                    {errorMessage && (
                        <Box mt={2}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        {t('Cancel')}
                    </Button>
                    <Button onClick={handleUpdateUser} color="primary" variant="contained">
                        {t('Save')}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for creating a new user */}
            <Dialog open={createDialogOpen} onClose={handleCreateDialogClose}>
                <DialogTitle>{t('Create New User')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('Please provide the details for the new user.')}
                    </DialogContentText>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="fullName"
                                label="Full Name"
                                type="text"
                                fullWidth
                                value={selectedUser ? selectedUser.fullName ?? "" : ""}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        fullName: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                id="email"
                                label="Email"
                                type="text"
                                fullWidth
                                value={selectedUser ? selectedUser.email ?? "" : ""}
                                onChange={(e) =>
                                    setSelectedUser({
                                        ...selectedUser,
                                        email: e.target.value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                    {errorMessage && (
                        <Box mt={2}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateDialogClose} color="primary">
                        {t('Cancel')}
                    </Button>
                    <Button onClick={handleCreateNewUser} color="primary" variant="contained">
                        {t('Create')}
                    </Button>
                </DialogActions>
            </Dialog>


        </Card>

    );
};

export default UMUsersList;
