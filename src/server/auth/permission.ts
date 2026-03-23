export type Actions = "users.view" | "users.delete" | "users.updateRoles";

export type scope = "course" | "own";

export type PermissionType = { name: Actions; scope?: scope };

export const roles: Array<{ name: string; permissions: PermissionType[] }> = [
  {
    name: "USER",
    permissions: [{ name: "users.view" }],
  },
];

    