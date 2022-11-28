import NextAuth from "next-auth";
import { UserNew } from "./User";

declare module "next-auth" {
  interface Session {
    user: UserNew;
  }
}
