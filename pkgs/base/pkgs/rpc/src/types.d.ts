export type Primitive =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined
  | void
  | Date
  | ArrayBuffer
  | Buffer
  | Uint8Array;

export type Serializable =
  | Primitive
  | Record<string, Serializable>
  | Serializable[];

export type RPCActionItem = (
  ...arg: any[]
) => Promise<Serializable> | Serializable;



export type PromisedRPCActionItem<T extends RPCActionItem> = (
  ...args: Parameters<T>
) => ReturnType<T> extends Promise<Primitive>
  ? ReturnType<T>
  : Promise<ReturnType<T>>;

export type RPCActionArg = Record<
  string,
  RPCActionItem | Record<string, RPCActionItem | Record<string, RPCActionItem>>
>;

export type RPCAction = Record<
  string,
  RPCActionItem | Record<string, RPCActionItem | Record<string, RPCActionItem>>
>;

export type RPCActionResult<T extends RPCAction> = {
  [K in keyof T]: T[K] extends Record<
    string,
    RPCActionItem | Record<string, RPCActionItem>
  >
    ? RPCActionResult<T[K]>
    : T[K] extends RPCActionItem
    ? PromisedRPCActionItem<T[K]>
    : Promise<T[K]>;
};

export type RPCServerAction<T extends RPCAction> = RPCActionResult<T> & {
  destroy: () => void;
};
