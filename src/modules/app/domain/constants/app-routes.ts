export const APP_ROUTES = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  HOME: "/home",
  PROFILE: "/profile",
  PROFILEMANAGEMENT: "/profile/profilemanagement",
  ARCHITECTS: "/architects",
  ARCHITECT_DETAIL: "/architects/:userId",
  SEARCH: "/search"
};

export const buildArchitectDetailPath = (userId: string) =>
  `/architects/${userId}`;
