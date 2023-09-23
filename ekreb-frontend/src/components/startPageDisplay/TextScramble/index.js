import React, { useEffect, useRef } from 'react';
import style from "./index.less"

// Attribution: great text scramble effects by Samuel Han 
// From https://codepen.io/catacalys/pen/vMNNoZ
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}


export default function ScrambleComponent({ phrases }) {
  const elRef = useRef(null);

  useEffect(() => {
    if (elRef.current) {
      const fx = new TextScramble(elRef.current);
      setTimeout(() => {
        // Inner setTimeout
        const next = () => {
          fx.setText(phrases[0]);
        };
        setTimeout(next, 100);
      }, 1000); // 2-second initial delay
    }
  }, []);

  return <div ref={elRef} className={style.scrambledText}></div>;
}
