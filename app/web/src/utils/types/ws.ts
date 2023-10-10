export type WS_MSG =
  | WS_MSG_GET_COMP
  | WS_MSG_SET_COMP
  | WS_MSG_GET_PAGE
  | WS_MSG_SET_PAGE
  | WS_MSG_SV_LOCAL
  | WS_MSG_SVDIFF_REMOTE
  | WS_MSG_DIFF_LOCAL
  | WS_MSG_UNDO
  | WS_MSG_REDO
  | WS_MSG_NEW_COMP
  | WS_SITE_JS
  | { type: "ping" }
  | { type: "pong" };

export type WS_SITE_JS = {
  type: "site-js";
  id_site: string;
  src: string;
};

export type WS_MSG_GET_COMP = {
  type: "get_comp";
  comp_id: string;
};
export type WS_MSG_SET_COMP = {
  type: "set_comp";
  comp_id: string;
  changes: string;
};

export type WS_MSG_GET_PAGE = {
  type: "get_page";
  page_id: string;
};

export type WS_MSG_SET_PAGE = {
  type: "set_page";
  changes: string;
};

export type WS_MSG_NEW_COMP = {
  type: "new_comp";
  id: string;
  doc: string;
};

export type WS_MSG_UNDO = {
  type: "undo";
  mode: "page" | "site" | "comp";
  id: string;
};

export type WS_MSG_REDO = {
  type: "redo";
  mode: "page" | "site" | "comp";
  id: string;
};

export type WS_MSG_SV_LOCAL = {
  type: "sv_local";
  mode: "page" | "site" | "comp";
  id: string;
  sv_local: string;
};

export type WS_MSG_SVDIFF_REMOTE = {
  type: "svd_remote";
  mode: "page" | "site" | "comp";
  id: string;
  sv_remote: string;
  diff_remote: string;
};

export type WS_MSG_DIFF_LOCAL = {
  type: "diff_local";
  mode: "page" | "site" | "comp";
  id: string;
  diff_local: string;
};
