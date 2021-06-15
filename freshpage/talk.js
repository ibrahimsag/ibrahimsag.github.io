
var activeStep = 1;

function elPos(el)
{
  return el.offsetTop + el.offsetHeight +40 - window.innerHeight;
}

function findEl()
{
  let els = document.querySelectorAll(".step");;
  let maxPos=-Infinity, maxEl=null;
  for(let i = 0;i < els.length; i++)
  {
    let el = els[i];
    el.classList.remove('active');
    let pos = elPos(el);
    let relPos = pos - window.scrollY;
    if(relPos < 50 && relPos > maxPos)
    {
      maxPos = relPos;
      maxEl = el;
    }
  }
  if(maxEl)
    maxEl.classList.add('active');
  return maxEl;
}

const EDIR = { LEFT: 1, UP: 2, DOWN: 3, RIGHT: 4 };

function move(dir)
{
  let maxEl = findEl();
  if(!maxEl)
  {
    let e = document.querySelectorAll('.step')[0];
    window.scrollTo(0, elPos(e));
    return;
  }

  else if(EDIR.UP === dir || EDIR.DOWN === dir)
  {
    let targetEl = null;
    if(EDIR.DOWN === dir)
    {

      targetEl = maxEl;
      do
      {
        targetEl = targetEl.nextElementSibling;
      } while(targetEl && !targetEl.classList.contains('step'));
    }
    else if(EDIR.UP === dir)
    {
      targetEl = maxEl;
      do
      {
        targetEl = targetEl.previousElementSibling;
      } while(targetEl && !targetEl.classList.contains('step'));
    }

    if(targetEl)
      window.scrollTo(0, elPos(targetEl));
  }
  else if(EDIR.LEFT === dir || EDIR.RIGHT === dir)
  {
    let imgs = maxEl.querySelectorAll('.figure');
    if(!imgs.length > 1)
      return;
    let ai = 0, a=null;
    for(let i = 0; i < imgs.length; i++)
    {
      let img = imgs[i];
      if(img.classList.contains('active'))
      {
        a = img;
        ai = i;
        break;
      }
    }
    let ms = maxEl.querySelectorAll('.mark');
    if(!a) return;
    if(EDIR.RIGHT === dir && ai < imgs.length - 1)
    {
      [ms[ai], ms[ai+1], imgs[ai], imgs[ai+1]].forEach(i => i.classList.toggle('active'));
    }
    else if(EDIR.LEFT === dir && ai > 0)
    {
      [ms[ai], ms[ai-1], imgs[ai], imgs[ai-1]].forEach(i => i.classList.toggle('active'));
    }
  }
}

document.onkeydown = function(e)
{
  if(e.key === "h" || e.keyCode === 37)
  {
  e.preventDefault();
    move(EDIR.LEFT);
  }
  else if(e.key === "j" || e.keyCode === 40)
  {
  e.preventDefault();
    move(EDIR.DOWN);
  }
  else if(e.key === "k" || e.keyCode === 38)
  {
  e.preventDefault();
    move(EDIR.UP);
  }
  else if(e.key === "l" || e.keyCode === 39)
  {
  e.preventDefault();
    move(EDIR.RIGHT);
  }
}

window.onload = ()=>
{
  let imgs = document.querySelectorAll('.step .figure');
  for(let i = 0; i < imgs.length; i++)
  {
    let img = imgs[i];
    img.width = img.width/2;
  }

  let steps = document.querySelectorAll('.step');
  for(let i = 0; i< steps.length; i ++)
  {
    let step = steps[i];
    let keyImgSrc = 'keys2.png'

    if(!step.classList.contains('sideway'))
    {
      kImgSrc= 'keys2.svg';
    }
    else
    {
      kImgSrc= 'keys4.svg';

      let imgs = step.querySelectorAll('.figure');
      let mEl = document.createElement('div');
      mEl.classList.add('marks');
      step.append(mEl);
      for(let i = 0; i < imgs.length; i++)
      {
        let e = document.createElement('div');
        e.classList.add('mark');
        if(i === 0)
          e.classList.add('active');
        e.textContent = i+1;
        mEl.appendChild(e);
      }
    }

    {
      let kImg, kEl;
      kEl = document.createElement('div');
      kEl.classList.add('keys');
      kImg = document.createElement('img');
      kImg.src = kImgSrc;
      kEl.append(kImg);
      step.appendChild(kEl);
    }
  }
  findEl();
}
    
let finding = false;
document.onscroll = function()
{
  if(!finding)
  {
    finding = true;
    setTimeout(function()
      {
        findEl();
        finding = false;
      }, 500);
  }
};
