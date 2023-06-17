import { useState } from "react";
import Styles from '../components/calculator.module.css'

const arr = [7,8,9,4,5,6,1,2,3,0,'+','-','.','*','/','c','='];
let sum = '';
let result = 0
let equale = true;

export const Calculator = () => {
  const [value, setValue] = useState(0);
	const getCalc = (event) =>{
		if(!event.target.getAttribute('data-value')){
			return
		}

		equale = true;

		if (sum[0] === '0'){
			if (sum[1] === '.'){}
			else{
				sum = sum.substring(1);
			}
		}

		const currentBtn = event.target.getAttribute('data-value');
		sum += currentBtn;

		const condition1 = sum[sum.length-1] === '+' || sum[sum.length - 1] === '-' || sum[sum.length - 1] === '*' || sum[sum.length - 1] === '/';
		const condition2 = sum[sum.length-2] === '+' || sum[sum.length - 2] === '-' || sum[sum.length - 2] === '*' || sum[sum.length - 2] === '/';
		const condition4 = sum[sum.length-2] === '.';
		const condition5 = sum[sum.length-1] === '.';
		const condition6 = sum[sum.length-2] === '0';
		const condition7 = sum[sum.length-3] === '+' || sum[sum.length - 3] === '-' || sum[sum.length - 3] === '*' || sum[sum.length - 3] === '/';

		if (condition1 && condition2){
			sum = sum.slice(0, -1);
		}
		if (condition6 && !condition5 && condition7){
			sum = sum.slice(0, -2);
		}

		if (event.target.getAttribute('data-value') === '='){
			sum = sum.slice(0, -1);
			if (sum.length < 2){
				return
			}
			if (condition2){
				sum = sum.slice(0, -1);
			}

			try{
				result = Number(eval(sum).toFixed(3));
			} catch{
				result = 'error';
			}

			setValue(result);
			sum = result.toString();
			equale = false;
			return
		}

		if (event.target.getAttribute('data-value') === 'c'){
			sum = '';
			result = 0
			setValue(0)
			return
		}

		if (event.target.getAttribute('data-value') === '.'){
			if(sum.length < 2){
				sum = '0' + sum;
			}
			if(condition4){
				sum = sum.slice(0, -1);;
			}

		}

		setValue(sum)
	}

	return (
		<div className={Styles.wrap} onClick={getCalc}>
		  <div className={equale ? Styles.display : Styles.resultColor}> {value} </div>
		  <div className={Styles.keybord}>
			  {arr.map( (el) => {
				return <button className={Styles.press} key={el} data-value={el}>
				          {el}
				       </button>;
			  })}
		  </div>
		</div>
	)
}
