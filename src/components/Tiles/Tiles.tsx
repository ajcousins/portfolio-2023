import React from 'react'
import styles from './Tiles.module.css';

interface IProps {
  content: any;
}

export default function Tiles({content}: IProps) {
  return (
    <div className={styles.tiles}>Tiles</div>
  )
}
