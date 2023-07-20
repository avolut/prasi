import { component_group } from "dbgen";
import { useLocal } from "web-utils";
import { wsdoc } from "../ws/wsdoc";
import { Loading } from "../../ui/loading";
import { FC } from "react";

export const CompUseShared: FC<{
  onChange: (group_id: string) => void;
}> = ({ onChange }) => {
  const local = useLocal(
    {
      list: [] as { id: string; name: string; count: number }[],
      loading: true,
    },
    async () => {
      const list = await db.component_group.findMany({
        select: {
          _count: {
            select: {
              component: true,
            },
          },
          id: true,
          name: true,
        },
        where: {
          component_site: {
            none: { id_site: wsdoc.site?.id },
          },
          shared: true,
        },
      });

      for (const item of list) {
        local.list.push({
          id: item.id,
          name: item.name,
          count: item._count.component,
        });
      }
      local.loading = false;
      local.render();
    }
  );
  return (
    <div
      className={cx(
        " flex items-stretch flex-col w-[300px] text-sm h-[600px] bg-white shadow-xl overflow-auto relative"
      )}
    >
      {local.loading ? (
        <Loading backdrop={false} />
      ) : (
        <>
          {local.list.length === 0 ? (
            <div className="flex flex-1 items-center justify-center">
              No Component Found
            </div>
          ) : (
            <>
              {local.list.map((e) => {
                return (
                  <div
                    key={e.id}
                    className="flex justify-between items-center hover:bg-blue-100 border-b py-2 px-4 cursor-pointer"
                    onClick={() => {
                      onChange(e.id);
                    }}
                  >
                    <div className={"flex flex-col items-stretch"}>
                      <div className="text-lg">{e.name}</div>
                      <div>{e.count} components</div>
                    </div>
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};
