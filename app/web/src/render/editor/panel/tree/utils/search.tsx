export const flatTreeSearch = () => {};

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
