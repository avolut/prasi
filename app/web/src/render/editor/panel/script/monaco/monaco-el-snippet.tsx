import { Button } from "../../../../../utils/ui/form/Button";

export const MonacoElSnippet = ({
  doEdit,
}: {
  doEdit: (newval: string, all?: boolean) => Promise<any>;
}) => {
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

      <Button
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
      </Button>

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
    </div>
  );
};
