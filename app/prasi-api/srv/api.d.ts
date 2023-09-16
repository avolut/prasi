declare module "app/gen/srv/api/entry" {
    export * as srv from "app/gen/srv/api/srv";
}
declare module "app/srv/api/built-in/_dbs" {
    export const _: {
        url: string;
        api(dbName: any, action?: string): Promise<void>;
    };
}
declare module "app/srv/api/built-in/_file" {
    export const _: {
        url: string;
        api(): Promise<void>;
    };
}
declare module "app/srv/api/built-in/_img" {
    import { FitEnum } from "sharp";
    export const _: {
        url: string;
        api(): Promise<void>;
    };
    export const optimizeImage: (path: string, target: string, conf: {
        w: number;
        h: number;
        fit: keyof FitEnum;
        slug: string;
    }) => Promise<void>;
}
declare module "pkgs/base/src/scaffold/parser/traverse" {
    import Visitor from "./swc/visitor";
    export const traverse: (source: string, params: (parent: Visitor) => Partial<InstanceType<typeof Visitor>>) => Promise<void>;
}
declare module "app/srv/api/built-in/_parsejs" {
    type SelectField = {
        [key: string]: {
            select?: SelectField;
        } | boolean;
    };
    type WhereField = {
        [key: string]: WhereField | string | undefined;
    };
    export type ParsedQuery = {
        type: "query";
        table: string;
        select: SelectField;
        where: WhereField;
    };
    export const _: {
        url: string;
        api(js: string): Promise<{
            status: string;
            parsed: ParsedQuery[];
        }>;
    };
    export const extractField: (e: Expression, select: any) => void;
}
declare module "app/srv/api/built-in/_prasi" {
    export const _: {
        url: string;
        api(): Promise<void>;
    };
}
declare module "app/srv/api/built-in/_upload" {
    export const _: {
        url: string;
        api(body: any): Promise<string>;
    };
}
declare module "app/srv/api/built-in/auth/change-password" {
    export const _: {
        url: string;
        api(datas: any): Promise<{
            status: boolean;
            message: string;
        }>;
    };
}
declare module "app/srv/api/built-in/auth/login" {
    export const _: {
        url: string;
        api(username: string, password: string): Promise<{
            status: string;
            session: {
                id: any;
            };
            reason?: undefined;
        } | {
            status: string;
            session: {
                id: string;
                expired: number;
                data: unknown;
            };
            reason?: undefined;
        } | {
            status: string;
            reason: string;
            session?: undefined;
        }>;
    };
}
declare module "app/srv/api/built-in/auth/logout" {
    export const _: {
        url: string;
        api(): Promise<{
            status: string;
        }>;
    };
}
declare module "app/srv/api/built-in/auth/register" {
    export const _: {
        url: string;
        api(datas: any): Promise<{
            status: boolean;
            message: string;
        }>;
    };
}
declare module "app/srv/api/built-in/auth/session-old" {
    export const _: {
        url: string;
        api(): Promise<any>;
    };
}
declare module "app/gen/srv/api/srv" {
    export const _dbs: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/built-in/_dbs")>;
    };
    export const _file: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<typeof import("app/srv/api/built-in/_file")>;
    };
    export const _img: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<typeof import("app/srv/api/built-in/_img")>;
    };
    export const _parsejs: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/built-in/_parsejs")>;
    };
    export const _prasi: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<typeof import("app/srv/api/built-in/_prasi")>;
    };
    export const _upload: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/built-in/_upload")>;
    };
    export const change_password: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/built-in/auth/change-password")>;
    };
    export const login: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/built-in/auth/login")>;
    };
    export const logout: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<typeof import("app/srv/api/built-in/auth/logout")>;
    };
    export const register: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/built-in/auth/register")>;
    };
    export const session_old: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<typeof import("app/srv/api/built-in/auth/session-old")>;
    };
}
