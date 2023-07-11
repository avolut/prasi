import type PRISMA from "../../../../../app/db/node_modules/.gen/index";

export const glbdb = globalThis as unknown as {
  serviceAction: any;
  prisma: PRISMA.PrismaClient<PRISMA.Prisma.PrismaClientOptions>;
  models: Record<string, Record<string, typeof sampleField>>;
};

export type DBArg = {
  db: string;
  table: string;
  action: string;
  params: any[];
};

const sampleField = {
  name: "id",
  kind: "scalar",
  isList: false,
  isRequired: true,
  isUnique: false,
  isId: true,
  isReadOnly: false,
  hasDefaultValue: true,
  type: "String",
  default: { name: "dbgenerated", args: ["gen_random_uuid()"] },
  isGenerated: false,
  isUpdatedAt: false,

  relationType: "has_many",
  relationName: "m_vesselTom_vessel_region",
  relationFromFields: [] as string[],
  relationToFields: [] as string[],
  relationOnDelete: "Restrict",
};

export type DbDefRels = Record<
  string,
  {
    relation: "Model.BelongsToOneRelation" | "Model.HasManyRelation";
    modelClass: string;
    join: {
      from: string;
      to: string;
    };
  }
>;

export type DbDefCols = Record<
  string,
  {
    name: string;
    type: string;
    rel?: "has-many" | "belongs-to";
    pk: boolean;
    nullable: boolean;
  }
>;
