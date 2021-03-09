import styles from "../styles/components/ExperienceBar.module.css";
export function ExperienceBar() {
   return (
      <header className={styles.experienceBar}>
         <span>8 px</span>
         <div>
            <div style={{ width: '60%' }}>
               <span className={styles.currentExpirence} style={{ left: '50%' }}>
                  300 px
               </span>
            </div>
         </div>
         <span>688 px</span>
      </header>
   )
}