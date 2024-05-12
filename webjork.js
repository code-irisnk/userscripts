// ==UserScript==
// @name        Jork Script - All Websites
// @namespace   slonkazoid
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      slonkazoid
// @description Jorks your website's content
// ==/UserScript==

function FUCK(e, pattern, replacement) {
    let i = 0;
    for (let c of e.childNodes) {
        if (c instanceof Element) {
            i += FUCK(c, pattern, replacement);
        } else {
            c.textContent = c.textContent.replace(pattern, replacement);
            i++;
        }
    }
    return i;
}

let el = document.querySelector("span.mw-page-title-main") ?? document.querySelector("h1.mw-first-heading");
if (!el) return;
let title = el.innerText;
let replaced = FUCK(document.body, /^[^\s]+/, title);
el.innerText = title;
console.log(replaced - 1, "replacements made");
