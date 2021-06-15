import React, { useState, useRef, useEffect } from 'react'
import styles from './Canvas.module.css'

const Canvas = props => {
  const [w, setW] = useState([])
  const [h, setH] = useState([])
  const [r, setR] = useState([])
  const [bool, setBool] = useState([])
  const [bool2, setBool2] = useState([])
  const [check, setCheck] = useState([])
  const [check2, setCheck2] = useState([])

  const canvasRef = useRef(null)

  const lines = (ctx, w1, w2, h1, h2) => {
    const maxW = Math.max(w1, w2)
    const minW = Math.min(w1, w2) 
    const maxH = Math.max(h1, h2)
    const minH = Math.min(h1, h2) 
    const dlina = Math.pow(maxW - minW, 2) + Math.pow(maxH - minH, 2)  
    
    if(dlina < 15000){
      ctx.moveTo(w1, h1);
      ctx.lineTo(w2, h2);
      ctx.strokeStyle = '#5c5c5c';
      ctx.lineWidth = .4 / Math.ceil(dlina / 1000);
      ctx.stroke(); 
      ctx.fill()  

    }
  }

  const move = (w, h, i) => {
    if (bool[i] == true) {
      w = w + 1
    }
    else if (bool[i] == false) {
      w = w - 1
    }

    if (bool2[i] == true) {
      h = h + 1
    }
    else if (bool2[i] == false) {
      h = h - 1
    }
    return [w, h]
  }

  const draw = (ctx, x, y) => {
    const countOfDots = Math.round(x / 12.8)
    console.log(countOfDots)

    const checkR = []
    for (let i = 0; i < countOfDots; i++) {
      if (i % 4 == 0) {
        check.push(false)
        check2.push(false)
      }
      else if(i % 4 == 1){
        check.push(false)
        check2.push(true)
      }
      else if(i % 4 == 2){
        check.push(true)
        check2.push(false)
      }
      else{
        check.push(true)
        check2.push(true)
      }
    }
    
    setInterval(() => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      for (let i = 0; i < countOfDots; i++) {
        w.push(Math.floor(Math.random() * x))
        h.push(Math.floor(Math.random() * y))
        r.push(Math.floor(Math.random() * (7 - 3)) + 3)
        ctx.beginPath()
        ctx.fillStyle = '#5c5c5c'
        ctx.arc(`${w[i]}`, h[i], r[i], 0, 2 * Math.PI)
      
        for(let j = 0; j < countOfDots; j++){
          lines(ctx, w[i], w[j], h[i], h[j])
        }
        ctx.fill()  

        if (r[i] <= 6 && !checkR[i]) {
          r[i] = r[i] + .1
        }
        else if (checkR[i]) {
          r[i] = r[i] - .1
          if (r[i] <= 3) {
            checkR[i] = false
          }
        }
        else if (r[i] >= 6) {
          checkR[i] = true
        }

        s(w[i], h[i], r[i], x, y, i)
        let cordinats = move(w[i], h[i], i)
        w[i] = cordinats[0]
        h[i] = cordinats[1]
        
      }
      bool.splice(0)
      bool2.splice(0)
    }, 50)
  }

  const s = (w, h, r, x, y, i) => {
    if (w < x - r && !check[i]) {
      bool.push(true)
    }
    else if (w >= x - r) {
      check[i] = true
      bool.push(false)
    }
    else if (w <= r) {
      check[i] = false
      bool.push(true)
    }
    else if (check[i]) {
      bool.push(false)
    }

    if (h < y - r && !check2[i]) {
      bool2.push(true)
    }
    else if (h >= y - r) {
      check2[i] = true
      bool2.push(false)
    }
    else if (h <= r) {
      check2[i] = false
      bool2.push(true)
    }
    else if (check2[i]) {
      bool2.push(false)
    }
  }


  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    draw(context, window.innerWidth , window.innerHeight)
  }, [])

  return <canvas className={styles.hid} width={`${window.screen.width}px`} height={`${window.screen.height}px`} ref={canvasRef} {...props} />
}

export default Canvas
