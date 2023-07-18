const protocol = window.location.protocol;
const hostname = window.location.hostname;
// const path = protocol + "//" + hostname;
const path = "https://" + hostname;

export const apiRoutes = {
  purchaseOrder: `${process.env.REACT_APP_DWH_BACKEND}/api/PurchaseOrder`,
  customerOrder:`${process.env.REACT_APP_DWH_BACKEND}/api/PurchaseOrder/outbound`,
  user:`${process.env.REACT_APP_DWH_BACKEND}/api/User`,
  //role:`${process.env.REACT_APP_DWH_BACKEND}/api/Role`,
  cmscontentimpact:`${process.env.REACT_APP_DWH_BACKEND}/api/CMSContentImpact`,
  cmscontentroles:`${process.env.REACT_APP_DWH_BACKEND}/api/CMSContentRoles`,
  cmscontentrolesbyid:`${process.env.REACT_APP_DWH_BACKEND}/api/CMSContentRoles/rolesByid`,
  cmscontentimpactbyrol:`${process.env.REACT_APP_DWH_BACKEND}/api/CMSContentImpact/contentByRol`,
  cmscontentimpactbyname:`${process.env.REACT_APP_DWH_BACKEND}/api/CMSContentImpact/contentByName`,
  cmscontentleadership: `${process.env.REACT_APP_DWH_BACKEND}/api/CMSContentLeadership`,
  cmscontentleadershipupdate: `${process.env.REACT_APP_DWH_BACKEND}/api/CMSContentLeadership/updateContent`,
  cmscontentleadershipbyid:`${process.env.REACT_APP_DWH_BACKEND}/api/CMSContentLeadership/contentById`,    
  cmscontentleadershipbyrol:`${process.env.REACT_APP_DWH_BACKEND}/api/CMSContentLeadership/contentByRol`,  
  cmscontentleadershipbyname:`${process.env.REACT_APP_DWH_BACKEND}/api/CMSContentLeadership/contentByName`,


  //API routes for User management
  icl_user: `${process.env.REACT_APP_DWH_BACKEND}/api/User/user-all`,
  icl_user_byid: `${process.env.REACT_APP_DWH_BACKEND}/api/User/user-by-id`,
  icl_user_create: `${process.env.REACT_APP_DWH_BACKEND}/api/User/user-create`,
  icl_user_update: `${process.env.REACT_APP_DWH_BACKEND}/api/User/user-update`,
  icl_user_delete: `${process.env.REACT_APP_DWH_BACKEND}/api/User/user-delete`,

  icl_role: `${process.env.REACT_APP_DWH_BACKEND}/api/Role/role-all`,
  icl_role_byid: `${process.env.REACT_APP_DWH_BACKEND}/api/Role/role-by-id`,
  icl_role_byname: `${process.env.REACT_APP_DWH_BACKEND}/api/Role/role-by-name`,
  icl_role_create: `${process.env.REACT_APP_DWH_BACKEND}/api/Role/role-create`,
  icl_role_update: `${process.env.REACT_APP_DWH_BACKEND}/api/Role/role-update`,
  icl_role_delete: `${process.env.REACT_APP_DWH_BACKEND}/api/Role/role-delete`,
  
  icl_options_route: `${process.env.REACT_APP_DWH_BACKEND}/api/OptionRoute/optionroute-all`,
  icl_options_route_byid: `${process.env.REACT_APP_DWH_BACKEND}/api/OptionRoute/optionroute-by-id`,
  icl_options_route_byuserid: `${process.env.REACT_APP_DWH_BACKEND}/api/OptionRoute/optionroute-by-userid`,
  icl_options_route_create: `${process.env.REACT_APP_DWH_BACKEND}/api/OptionRoute/optionroute-create`,
  icl_options_route_create_batch: `${process.env.REACT_APP_DWH_BACKEND}/api/OptionRoute/optionroute-create-batch`,
  icl_options_route_update: `${process.env.REACT_APP_DWH_BACKEND}/api/OptionRoute/optionroute-update`,
  icl_options_route_update_batch: `${process.env.REACT_APP_DWH_BACKEND}/api/OptionRoute/optionroute-update-batch`,
  icl_options_route_delete: `${process.env.REACT_APP_DWH_BACKEND}/api/OptionRoute/optionroute-delete`,

  icl_role_option: `${process.env.REACT_APP_DWH_BACKEND}/api/RoleOption/roleoption-all`,
  icl_role_option_byid: `${process.env.REACT_APP_DWH_BACKEND}/api/RoleOption/roleoption-by-id`,
  icl_role_option_byrole: `${process.env.REACT_APP_DWH_BACKEND}/api/RoleOption/roleoption-by-role`,
  icl_role_option_byoption: `${process.env.REACT_APP_DWH_BACKEND}/api/RoleOption/roleoption-by-option`,
  icl_role_option_create_batch: `${process.env.REACT_APP_DWH_BACKEND}/api/RoleOption/roleoption-create-batch`,
  icl_role_option_create: `${process.env.REACT_APP_DWH_BACKEND}/api/RoleOption/roleoption-create`,
  icl_role_option_update_batch: `${process.env.REACT_APP_DWH_BACKEND}/api/RoleOption/roleoption-update-batch`,
  icl_role_option_update: `${process.env.REACT_APP_DWH_BACKEND}/api/RoleOption/roleoption-update`,
  icl_role_option_delete: `${process.env.REACT_APP_DWH_BACKEND}/api/RoleOption/roleoption-delete`,

  icl_user_role: `${process.env.REACT_APP_DWH_BACKEND}/api/UserRole/userrole-all`,
  icl_user_role_byid: `${process.env.REACT_APP_DWH_BACKEND}/api/UserRole/userrole-by-id`,
  icl_user_role_byuser: `${process.env.REACT_APP_DWH_BACKEND}/api/UserRole/userrole-by-user`,
  icl_user_role_byrole: `${process.env.REACT_APP_DWH_BACKEND}/api/UserRole/userrole-by-role`,
  icl_user_role_create_batch: `${process.env.REACT_APP_DWH_BACKEND}/api/UserRole/userrole-create-batch`,
  icl_user_role_create: `${process.env.REACT_APP_DWH_BACKEND}/api/UserRole/userrole-create`,
  icl_user_role_update_batch: `${process.env.REACT_APP_DWH_BACKEND}/api/UserRole/userrole-update-batch`,
  icl_user_role_update: `${process.env.REACT_APP_DWH_BACKEND}/api/UserRole/userrole-update`,
  icl_user_role_delete: `${process.env.REACT_APP_DWH_BACKEND}/api/UserRole/userrole-delete`,

};
