import { useGlobal } from "web-utils";
import { Button } from "../../../../../utils/ui/form/Button";
import { EditorGlobal } from "../../../logic/global";
import { rebuildTree } from "../../../logic/tree-logic";
import { Tooltip } from "../../../../../utils/ui/tooltip";

export const MonacoElSnippet = ({
  doEdit,
}: {
  doEdit: (newval: string, all?: boolean) => Promise<any>;
}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  return (
    <div className="flex items-center space-x-1 pl-1">
      <Button
        onClick={() => {
          doEdit(
            `\
<div {...props}>
<Local
name="local"
value={
{
//local object
}
}
effect={async (local) => {
//local effect
}}
>
{children}
</Local>
</div>
        `,
            true
          );
        }}
      >
        &lt;Local/&gt;
      </Button>
      <Button
        onClick={() => {
          doEdit(
            `\
<div {...props}>
<PassProp val={"yourval"}>{children}</PassProp>
</div>`,
            true
          );
        }}
      >
        &lt;PassProp/&gt;
      </Button>
      <Button
        onClick={() => {
          doEdit(
            `\
<div {...props}>
{(local.list || []).map((item, idx) => (
<PassProp item={item} key={idx}>
{children}
</PassProp>
))}
</div>   
`,
            true
          );
        }}
      >
        &lt;Map /&gt;
      </Button>

      <Button
        onClick={() => {
          doEdit(
            `\
<>{true && <div {...props}>{children}</div>}</>   
`,
            true
          );
        }}
      >
        &lt;If /&gt;
      </Button>

      <Button
        onClick={() => {
          doEdit(
            `\
<>
{
/**if condition */
true ? (
/** then  */
<div {...props}>{children}</div>
) : (
/** else  */
<div {...props}>ELSE CONDITION</div>
)
}
</>
`,
            true
          );
        }}
      >
        &lt;If Else /&gt;
      </Button>

      <Button
        onClick={() => {
          doEdit(
            `\
<input {...props} />`,
            true
          );
        }}
      >
        &lt;Input /&gt;
      </Button>

      {/* <Button
    onClick={() => {
      doEdit(
        `<Preload {...props} url={[""]}>{children}</Preload>`,
        true
      );
    }}
  >
    &lt;Preload/&gt;
  </Button> */}

      {/* <Button
        onClick={() => {
          doEdit(`<>{isMobile && <div {...props}>{children}</div>}</>`, true);
        }}
      >
        &lt;isMobile/&gt;
      </Button>

      <Button
        onClick={() => {
          doEdit(`<>{isDesktop && <div {...props}>{children}</div>}</>`, true);
        }}
      >
        &lt;isDesktop/&gt;
      </Button> */}

      <Button
        onClick={() => {
          doEdit(
            `\
<div {...props}>{children}</div>`,
            true
          );
        }}
      >
        Reset
      </Button>

      <Button
        onClick={() => {
          doEdit(
            `\
<div
{...props}
className={cx(
props.className,
css\`
/** Custom CSS **/



\`
)}
>
{children}
</div>
        `,
            true
          );
        }}
      >
        CSS
      </Button>
      <Button
        onClick={() => {
          doEdit(
            `\
<div
{...props}
className={cx(props.className,"custom-class")}
>
{children}
</div>
        `,
            true
          );
        }}
      >
        ClassName
      </Button>
      <Button
        onClick={async () => {
          p.script.active = false;
          p.localReloading = {};
          p.render();
          await rebuildTree(p, { mode: "reset", note: "reload" });
          setTimeout(() => {
            p.script.active = true;
            p.render();
          }, 100);
        }}
      >
        <Tooltip content="Reload (alt-R)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="none"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M1.85 7.5c0-2.835 2.21-5.65 5.65-5.65 2.778 0 4.152 2.056 4.737 3.15H10.5a.5.5 0 000 1h3a.5.5 0 00.5-.5v-3a.5.5 0 00-1 0v1.813C12.296 3.071 10.666.85 7.5.85 3.437.85.85 4.185.85 7.5c0 3.315 2.587 6.65 6.65 6.65 1.944 0 3.562-.77 4.714-1.942a6.77 6.77 0 001.428-2.167.5.5 0 10-.925-.38 5.77 5.77 0 01-1.216 1.846c-.971.99-2.336 1.643-4.001 1.643-3.44 0-5.65-2.815-5.65-5.65z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Tooltip>
      </Button>
    </div>
  );
};
