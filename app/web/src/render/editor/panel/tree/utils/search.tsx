import { NodeModel } from "@minoru/react-dnd-treeview";
import get from "lodash.get";
import uniqBy from "lodash.uniqby";
import { NodeMeta, PG } from "../../../logic/global";

export const search = (
  p: PG,
  option: any,
  value: any,
  tree: NodeModel<NodeMeta>[]
) => {
  const { searchDeep, Name, JS, CSS, HTML } = option;
  let compSearch = [] as any;
  if (searchDeep) {
    let treeComponent: any = [];
    if (Object.entries(p.comps.doc).length) {
      for (let [k, v] of Object.entries(p.comps.doc)) {
        // const contentTree = v.getMap("map").get("content_tree") as MItem;
        // let treeComp = flattenTree(p, contentTree, true, k);
        // treeComponent = treeComponent.concat(treeComp);
        // treeComp = treeSearch(treeComp, option, value, compSearch);
        // if (treeComp.length) {
        //   compSearch.push(k);
        // }
      }
    }
    let result = flattenSearchComp(treeComponent, compSearch);
    compSearch = result;
  }
  tree = treeSearch(tree, option, value, compSearch);
  tree.map((item: any) => {
    item.parent = "root";
  });
  return tree;
};

export const treeSearch = (tree: any, option: any, value: any, comp?: any) => {
  const { Name, JS, CSS, HTML } = option;
  let result = [] as any;
  for (let [k, v] of Object.entries(option)) {
    let data = tree.filter((e: any) =>
      get(e, `data.content.adv.${k.toLowerCase()}`)
    );
    if (v) {
      switch (k) {
        case "Name":
          result = result.concat(
            tree.filter((e: any) => fuzzyMatch(value, e.text)) || []
          );
          break;
        case "JS":
          result = result.concat(
            data.filter(
              (e: any) =>
                fuzzyRegexMatch(value, e.data.content.adv.js) &&
                e.data.content.adv.js !== ""
            )
          );
          break;
        case "HTML":
          result = result.concat(
            data.filter(
              (e: any) =>
                fuzzyRegexMatch(value, get(e, "data.content.adv.html")) &&
                get(e, "data.content.adv.html") !== ""
            )
          );
          break;
        case "CSS":
          result = result.concat(
            data.filter(
              (e: any) =>
                fuzzyRegexMatch(value, e.data.content.adv.css) &&
                e.data.content.adv.css !== ""
            )
          );
          break;
        case "searchDeep":
          let component = tree.filter((e: any) =>
            get(e, `data.content.component.id`)
          );
          result = result.concat(
            component.filter((e: any) => {
              for (let [k, v] of Object.entries(
                e.data.content.component.props
              )) {
                if (
                  fuzzyRegexMatch(value, k) ||
                  fuzzyRegexMatch(value, get(v, "value"))
                ) {
                  return true;
                }
              }
            })
          );

          // Search component
          if (comp)
            if (comp.length) {
              result = result.concat(
                component.filter(
                  (e: any) =>
                    (comp || []).filter(
                      (x: any) => x === get(e, `data.content.component.id`)
                    ).length
                )
              );
            }
          break;
        default:
          break;
      }
    }
  }
  result = uniqBy(result, (e: any) => e.id);
  // console.log({ result });
  return result;
};

export const flattenSearchComp = (tree: any, search: any) => {
  // console.log({ tree, search });
  let result = [] as any;
  if (search.length) {
    let compSearch = tree.filter(
      (e: any) =>
        search.find((x: any) => x === get(e, "data.content.component.id")) &&
        e.parent !== "root"
    );
    let idSearch = compSearch.map((e: any) => e.parent);
    // console.log(compSearch, idSearch);
    result = search.concat(uniqBy(idSearch, (e: any) => e));
  }
  return result;
};

export const deepSearchComponent = (id: string, option: any, value: any) => {
  // const p = useGlobal(EditorGlobal, "EDITOR");
  // // let pcomp = p.comps.doc[id];
  // console.log(p);
  // if (!pcomp){
  //   return []
  // }else{
  //   let tree = flattenTree(p, pcomp, treeLoading);
  // }
};

export const fuzzyRegexMatch = (needle: any, haystack: any) => {
  if (needle === "" || haystack === "") return true;
  needle = needle.toLowerCase().replace(/\s/g, ".");
  haystack = haystack.toLowerCase(); // All characters in needle must be present in haystack
  var j = 0; // haystack position
  const regex = new RegExp(`${needle}`, "gi");
  let result = regex.test(haystack);
  return result;
};

export const fuzzyMatch = (needle: any, haystack: any) => {
  if (needle === "" || haystack === "") return true;
  needle = needle.toLowerCase().replace(/ /g, "");
  haystack = haystack.toLowerCase(); // All characters in needle must be present in haystack
  var j = 0; // haystack position

  for (var i = 0; i < needle.length; i++) {
    // Go down the haystack until we find the current needle character
    while (needle[i] !== haystack[j]) {
      j++; // If we reached the end of the haystack, then this is not a match

      if (j === haystack.length) {
        return false;
      }
    } // Here, needle character is same as haystack character
    //console.log(needle + ":" + i + " === " + haystack + ":" + j);
  } // At this point, we have matched every single letter in the needle without returning false

  return true;
};
