
import { initRain, initSnowSpeed,initNightLights } from '../components/canvas';

export function initIndexPage() {

const layers = document.querySelectorAll('.layers');
let indexActive = 0;
document.addEventListener('click', (e)=> {
  if(!layers.length) return;
  if(indexActive >= layers.length - 1) return;
  const target = e.target as HTMLElement
  if (!target?.closest('button')) return;
  layers[indexActive].setAttribute('aria-hidden', 'true');
  indexActive++;
  layers[indexActive].removeAttribute('aria-hidden');
  layers[indexActive].classList.add('layers--active');
})

  initRain('rain');
  initSnowSpeed('snow');
  initNightLights('night-lights');
 
  document.addEventListener('mousemove', (e)=> {

    Object.assign(document.documentElement, {
      
      style: `
      --move-x:${(e.clientX - window.innerWidth/2) * -0.005}deg;
      --move-y:${(e.clientY - window.innerHeight/2) * -0.01}deg;
      `
    })
  })
}
