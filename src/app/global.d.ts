export {};

// Define roles as a union type
export type Roles = "admin" | "moderator" | "users";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles; 
      users?:Roles;// Optional role field
    };
  }
}
