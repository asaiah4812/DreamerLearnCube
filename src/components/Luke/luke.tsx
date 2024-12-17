"use client"
import React from 'react'
import style from './luke.module.css'

const Luke = () => {
  return (
    <div className={style.myLoader}>
      <div className={style.rubiksCube}>
        <div className={`${style.face} ${style.front}`}>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
          <div style={{background: '#ffffff'}} className={style.cube}></div>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
        </div>

        <div className={`${style.face} ${style.back}`}>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
          <div style={{background: '#ffffff'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
        </div>
        <div className={`${style.face} ${style.left}`}>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
          <div style={{background: '#ffffff'}} className={style.cube}></div>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
        </div>
        <div className={`${style.face} ${style.right}`}>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
          <div style={{background: '#ffffff'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
        </div>
        <div className={`${style.face} ${style.top}`}>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#ffffff'}} className={style.cube}></div>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
        </div>
        <div className={`${style.face} ${style.bottom}`}>
          <div style={{background: '#ffffff'}} className={style.cube}></div>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
          <div style={{background: '#ffeb3b'}} className={style.cube}></div>
          <div style={{background: '#4caf50'}} className={style.cube}></div>
          <div style={{background: '#2196f3'}} className={style.cube}></div>
          <div style={{background: '#ffffff'}} className={style.cube}></div>
          <div style={{background: '#ff3d00'}} className={style.cube}></div>
        </div>
      </div>
    </div>
  )
}

export default Luke
