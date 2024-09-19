// import { useEffect, useRef } from "react";
// import { IItemClockProps } from "../../modal/modal";

// export const ItemClock = (props: IItemClockProps) => {
//   const { title, zone, callback } = props;
//   const clock = useRef<HTMLDivElement>(null); 

//   useEffect(() => { // Начало жизненного цикла
//     const day = new Date();
//     const timeZoneOffset = day.getTimezoneOffset();
//     let hour = day.getHours() + (timeZoneOffset / 60) + Number(zone);
//     let minutes = day.getMinutes();
//     let seconds = day.getSeconds();
//     // console.log('begin' , title)

//     let hrrotation = (30 * hour) + (0.5 * minutes);
//     let minrotation = 6 * minutes;
//     let secrotation = 6 * seconds;

//     const hr = clock.current?.querySelector('.hr') as HTMLElement;
//     const min = clock.current?.querySelector('.min') as HTMLElement;
//     const sec = clock.current?.querySelector('.sec') as HTMLElement;

//     hr.style.transform = `translate(-50%,-100%) rotate(${hrrotation}deg)`;
//     min.style.transform = `translate(-50%,-100%) rotate(${minrotation}deg)`;
//     sec.style.transform = `translate(-50%,-85%) rotate(${secrotation}deg)`;

//     let idTimer = window.setTimeout(function timer() { // таймер для компонента
//       seconds = (seconds === 59) ? 0 : seconds + 1;
//       minutes = (seconds === 0) ? minutes + 1 : minutes;
//       hour = (minutes === 60) ? hour + 1 : hour;
//       minutes = (minutes === 60) ? 0 : minutes;
//       hour = (hour === 24) ? 0 : hour;

//       hrrotation = (30 * hour) + (0.5 * minutes);
//       minrotation = 6 * minutes;
//       secrotation = 6 * seconds;
//       hr.style.transform = `translate(-50%,-100%) rotate(${hrrotation}deg)`;
//       min.style.transform = `translate(-50%,-100%) rotate(${minrotation}deg)`;
//       sec.style.transform = `translate(-50%,-85%) rotate(${secrotation}deg)`;
//       idTimer = window.setTimeout(timer, 1000);
//       // console.log('timer' , idTimer)
//     }, 1000);

//     return () => { // Конец жизненного цикла, очищаем таймер
//       // console.log('end' , idTimer)
//       window.clearTimeout(idTimer);
//     }
//   }, [zone]) 

//   return (
//     <div className="clock__item">
//       <div className="clock__title">{title}</div>
//       <div className="clock" ref={clock}>
//         <div className="hr"></div>
//         <div className="min"></div>
//         <div className="sec"></div>
//         <div className="pin"></div>
//         <div className="clock__cross" onClick={callback}></div>
//       </div>
//     </div>
//   )
// }
