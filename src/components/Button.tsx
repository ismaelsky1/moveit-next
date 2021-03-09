import { useState } from "react";
interface ButtonPros {
   color: string,
   children: any
}
export function Button(props: ButtonPros) {
   const [counter, setCounter] = useState(1);

   function inclement() {
      setCounter(counter + 1);
   }

   return (
      <button
         onClick={inclement}
         style={{ background: props.color }}
         type="button">
         {props.children} <strong >{counter}</strong>
      </button>
   )
};