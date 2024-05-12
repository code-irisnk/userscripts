// ==UserScript==
// @name         Shuffle Words in Paragraphs
// @namespace    slonkazoid
// @version      0.1
// @description  Shuffle 
// @author       Your Mom
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function shuffleWords(text) {
        return text.split(' ').sort(() => Math.random() - 0.5).join(' ');
    }

    function shuffleParagraph(paragraph) {
        let words = paragraph.textContent.split(' ');
        let shuffleLimit = words.length * 2;
        let numWordsToShuffle = Math.floor(Math.random() * (shuffleLimit + 1));

        for (let i = 0; i < numWordsToShuffle; i++) {
            let randomIndex1 = Math.floor(Math.random() * words.length);
            let randomIndex2 = Math.floor(Math.random() * words.length);
            [words[randomIndex1], words[randomIndex2]] = [words[randomIndex2], words[randomIndex1]];
        }

        paragraph.textContent = words.join(' ');
    }

    document.querySelectorAll('p').forEach(paragraph => {
        shuffleParagraph(paragraph);
    });
})();
