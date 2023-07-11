import { glbdb } from "../glbdb";
import { waitUntil } from "utility/wait-until";

export const inspectSchema = async (
  table: string,
  gdb: any,
  prisma: string
) => {
  if (!gdb[prisma]) {
    console.log("Waiting db to connect...");
    await waitUntil(() => gdb[prisma]);
  }

  const pk: string[] = [];
  const fields: typeof sampleField[] = [];
  const dmmf = gdb[prisma]._baseDmmf.datamodel.models;
  if (!glbdb.models) {
    glbdb.models = {};
    for (const model of dmmf) {
      glbdb.models[model.name] = {};
      for (const col of model.fields) {
        glbdb.models[model.name][col.name] = col;
      }
    }
  }

  const model = glbdb.models[table];
  if (model) {
    for (const f of Object.values(model)) {
      if (f && f.isId) {
        pk.push(f.name);
      }

      if (f.relationName) {
        if (f.relationFromFields.length === 0) {
          f.relationType = "has_many";
          const to = glbdb.models[f.type];

          if (to) {
            const tof = Object.values(to).find(
              (e) => e.relationName === f.relationName
            );
            f.relationToFields = tof ? [tof.relationFromFields[0]] : [];
            f.relationFromFields = tof ? [tof.relationToFields[0]] : [];
          }
        } else {
          f.relationType = "belongs_to";
        }
      }
      fields.push(f);
    }
  }

  return { pk, fields };
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
