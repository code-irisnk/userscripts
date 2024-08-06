// ==UserScript==
// @name        stroke script - web.
// @namespace   slonkazoid
// @match       *://*/*
// @grant       none
// @version     3.0
// @author      slonkazoid, iri
// @description strokes your web.
// ==/UserScript==

console.log("sometimes I dream about cheese");

let el = document.querySelector("span.mw-page-title-main, h1.mw-first-heading, h1");
if (!el) return;
let pageTitle = el.innerText;
let replacedCount = 0;

function traverseAndReplace(node, pattern, replacement) {
    let replacedCount = 0;
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
        const textNode = walker.currentNode;
        if (textNode.textContent.match(pattern)) {
            textNode.textContent = textNode.textContent.replace(pattern, replacement);
            replacedCount++;
        }
    }
    return replacedCount;
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const paragraphs = document.querySelectorAll("p");
paragraphs.forEach(paragraph => {
    let words = paragraph.textContent.split(" ");
    let numWords = words.length;

    for (let i = 0; i < numWords; i++) {
        if (Math.random() < 0.3) {
            words.splice(i, 0, pageTitle);
            i += pageTitle.split(" ").length;
            numWords += pageTitle.split(" ").length;
            replacedCount++;
        }
    }

    for (let i = 0; i < numWords; i++) {
        if (Math.random() < 0.25) {
            words[i] += " " + words[i];
        }
        if (Math.random() < 0.1) {
            words[i] = ({} + []);
        }
    }

    let newText = '';
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    for (let i = 0; i < paragraph.textContent.length; i++) {
        let char = paragraph.textContent[i];
        if (vowels.includes(char) && Math.random() < 0.25) {
            let vowelIndex = vowels.indexOf(char);
            let newVowelIndex = (vowelIndex + randInt(1, 4)) % 5;
            newText += vowels[newVowelIndex];
        } else {
            newText += char;
        }
    }
    paragraph.textContent = newText;
});

console.log(replacedCount, "replacements made");
