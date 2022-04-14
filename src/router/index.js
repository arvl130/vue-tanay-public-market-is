import { createRouter, createWebHistory } from "vue-router";
/* Static pages */
import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";
import TermsAndConditions from "../views/TermsAndConditions.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import ChooseUser from "../views/ChooseUser.vue";

/* Admin pages */
import AdminLogin from "../views/AdminLogin.vue";
import AdminDashboard from "../views/adminonly/AdminDashboard.vue";
import AdminProfile from "../views/adminonly/AdminProfile.vue";
import AdminSettings from "../views/adminonly/AdminSettings.vue";
import AdminChangePassword from "../views/adminonly/AdminChangePassword.vue";
import AdminChangeUsername from "../views/adminonly/AdminChangeUsername.vue";
import ManageTenants from "../views/adminonly/ManageTenants.vue";
import TenantPayments from "../views/adminonly/TenantPayments.vue";
import TenantPaymentReceipts from "../views/adminonly/TenantPaymentReceipts.vue";
import NewTenant from "../views/adminonly/NewTenant.vue";
import UpdateTenant from "../views/adminonly/UpdateTenant.vue";
import ChangeTenantPassword from "../views/adminonly/ChangeTenantPassword.vue";
import VerifyPayments from "../views/adminonly/VerifyPayments.vue";
import VerifyPaymentReceipts from "../views/adminonly/VerifyPaymentReceipts.vue";
import BreakdownOfUnverifiedPayments from "../views/adminonly/BreakdownOfUnverifiedPayments.vue";
import AdminNoticeLetters from "../views/adminonly/AdminNoticeLetters.vue";
import NewNoticeLetter from "../views/adminonly/NewNoticeLetter.vue";
import GeneratedNoticeLetter from "../views/adminonly/GeneratedNoticeLetter.vue";
import AdminViewNoticeLetter from "../views/adminonly/AdminViewNoticeLetter.vue";
import PrintNoticeLetter from "../views/PrintNoticeLetter.vue";

/* Tenant pages */
import TenantLogin from "../views/TenantLogin.vue";
import TenantDashboard from "../views/tenantonly/TenantDashboard.vue";
import TenantProfile from "../views/tenantonly/TenantProfilePage.vue";
import TenantSettings from "../views/tenantonly/TenantSettingsPage.vue";
import TenantChangePassword from "../views/tenantonly/TenantChangePassword.vue";
import TenantChangeUsername from "../views/tenantonly/TenantChangeUsername.vue";
import PendingPayments from "../views/tenantonly/PendingPayments.vue";
import PendingPaymentReceipts from "../views/tenantonly/PendingPaymentReceipts.vue";
import NewReceipt from "../views/tenantonly/NewReceipt.vue";
import EditReceipt from "../views/tenantonly/EditReceipt.vue";
import FulfilledPayments from "../views/tenantonly/FulfilledPayments.vue";
import FulfilledPaymentReceipts from "../views/tenantonly/FulfilledPaymentReceipts.vue";
import BreakdownOfFulfilledPayments from "../views/tenantonly/BreakdownOfFulfilledPayments.vue";
import TenantNoticeLetters from "../views/tenantonly/TenantNoticeLetters.vue";
import TenantViewNoticeLetter from "../views/tenantonly/TenantViewNoticeLetter.vue";

/* scripts */
import userIsAdmin from "../composables/user-checks/userIsAdmin";
import userIsTenant from "../composables/user-checks/userIsTenant";
import userIsLoggedIn from "../composables/user-checks/userIsLoggedIn";
import { getAuth } from "firebase/auth";

const auth = getAuth();

const redirectToAdminDashboardIfAdminUser = async () => {
  const currentUser = auth.currentUser;

  if (currentUser && (await userIsAdmin())) {
    return { name: "Admin Dashboard" };
  }
};

const redirectToTenantDashboardIfTenantUser = async () => {
  const currentUser = auth.currentUser;

  if (currentUser && (await userIsTenant())) {
    return { name: "Tenant Dashboard" };
  }
};

const redirectToHomeIfNotAdminUser = async () => {
  if (!(await userIsAdmin())) {
    return { name: "Home" };
  }
};

const redirectToHomeIfNotTenantUser = async () => {
  if (!(await userIsTenant())) {
    return { name: "Home" };
  }
};

const redirectToHomeIfLoggedInUser = async () => {
  if (userIsLoggedIn()) {
    return { name: "Home" };
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "Home",
      path: "/",
      component: HomePage,
      beforeEnter: [
        redirectToAdminDashboardIfAdminUser,
        redirectToTenantDashboardIfTenantUser,
      ],
    },
    {
      name: "About",
      path: "/about",
      component: AboutPage,
    },
    {
      name: "Choose User",
      path: "/chooseuser",
      component: ChooseUser,
      beforeEnter: [
        redirectToAdminDashboardIfAdminUser,
        redirectToTenantDashboardIfTenantUser,
      ],
    },
    {
      name: "Admin Login",
      path: "/admin/login",
      component: AdminLogin,
      beforeEnter: [
        redirectToAdminDashboardIfAdminUser,
        redirectToTenantDashboardIfTenantUser,
        redirectToHomeIfLoggedInUser,
      ],
    },
    {
      name: "Admin Dashboard",
      path: "/admin/",
      component: AdminDashboard,
      beforeEnter: [
        redirectToTenantDashboardIfTenantUser,
        redirectToHomeIfNotAdminUser,
      ],
    },
    {
      name: "Admin Profile",
      path: "/admin/profile",
      component: AdminProfile,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Admin Settings",
      path: "/admin/settings",
      component: AdminSettings,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Admin Change Password",
      path: "/admin/settings/password",
      component: AdminChangePassword,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Admin Change Username",
      path: "/admin/settings/username",
      component: AdminChangeUsername,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Manage Tenants",
      path: "/admin/managetenants",
      component: ManageTenants,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Tenant Payments",
      path: "/admin/managetenants/:id/payments",
      beforeEnter: [redirectToHomeIfNotAdminUser],
      component: TenantPayments,
    },
    {
      name: "Tenant Payment Receipts",
      path: "/admin/managetenants/:tenant_uid/payments/:payment_uid/receipts",
      beforeEnter: [redirectToHomeIfNotAdminUser],
      component: TenantPaymentReceipts,
    },
    {
      name: "New Tenant",
      path: "/admin/managetenants/new",
      component: NewTenant,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Update Tenant",
      path: "/admin/managetenants/:id/update",
      component: UpdateTenant,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Change Tenant Password",
      path: "/admin/managetenants/:id/reset-password",
      component: ChangeTenantPassword,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Verify Payments",
      path: "/admin/verifypayments/",
      component: VerifyPayments,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Verify Payment Receipts",
      path: "/admin/verifypayments/:id/receipts",
      component: VerifyPaymentReceipts,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Breakdown of Unverified Payments",
      path: "/admin/verifypayments/breakdown",
      component: BreakdownOfUnverifiedPayments,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Admin Notice Letters",
      path: "/admin/notice-letters",
      component: AdminNoticeLetters,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "New Notice Letter",
      path: "/admin/notice-letters/new",
      component: NewNoticeLetter,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Generated Notice Letter",
      path: "/admin/notice-letters/preview",
      component: GeneratedNoticeLetter,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Admin Print Notice Letter",
      path: "/admin/notice-letters/:id/print",
      component: PrintNoticeLetter,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Admin View Notice Letter",
      path: "/admin/notice-letters/:id/view",
      component: AdminViewNoticeLetter,
      beforeEnter: [redirectToHomeIfNotAdminUser],
    },
    {
      name: "Tenant Login",
      path: "/tenant/login",
      component: TenantLogin,
      beforeEnter: [
        redirectToTenantDashboardIfTenantUser,
        redirectToAdminDashboardIfAdminUser,
        redirectToHomeIfLoggedInUser,
      ],
    },
    {
      name: "Tenant Dashboard",
      path: "/tenant/",
      component: TenantDashboard,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Tenant Profile",
      path: "/tenant/profile",
      component: TenantProfile,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Tenant Settings",
      path: "/tenant/settings",
      component: TenantSettings,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Tenant Change Password",
      path: "/tenant/settings/password",
      component: TenantChangePassword,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Tenant Change Username",
      path: "/tenant/settings/username",
      component: TenantChangeUsername,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Pending Payments",
      path: "/tenant/pending-payments",
      component: PendingPayments,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Pending Payment Receipts",
      path: "/tenant/pending-payments/:id/receipts",
      component: PendingPaymentReceipts,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "New Receipt",
      path: "/tenant/pending-payments/:id/receipts/add",
      component: NewReceipt,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Edit Receipt",
      path: "/tenant/pending-payments/:payment_uid/receipts/:receipt_uid/edit",
      component: EditReceipt,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Fulfilled Payments",
      path: "/tenant/fulfilled-payments",
      component: FulfilledPayments,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Fulfilled Payment Receipts",
      path: "/tenant/fulfilled-payments/:id/receipts",
      component: FulfilledPaymentReceipts,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Breakdown of Fulfilled Payments",
      path: "/tenant/fulfilled-payments/breakdown",
      component: BreakdownOfFulfilledPayments,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Tenant Notice Letters",
      path: "/tenant/notice/letters",
      component: TenantNoticeLetters,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Tenant View Notice Letter",
      path: "/tenant/notice-letters/:id/view",
      component: TenantViewNoticeLetter,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Tenant Print Notice Letter",
      path: "/tenant/notice-letters/:id/print",
      component: PrintNoticeLetter,
      beforeEnter: [redirectToHomeIfNotTenantUser],
    },
    {
      name: "Terms & Conditions",
      path: "/terms-and-conditions",
      component: TermsAndConditions,
    },
    {
      name: "Privacy Policy",
      path: "/privacy-policy",
      component: PrivacyPolicy,
    },
  ],
});

export default router;
