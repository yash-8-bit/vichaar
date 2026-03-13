import { userSchemaType } from "@/validations/zod/user";

export interface userSchemaType_ extends userSchemaType {
    email : string;
    createdAt : string;
}