console.log('loaded');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let isPainting = false;
let curVersionId = 0;
let color = 'black';
let lineWidth = 10;
const versions = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const startDraw = (e) => {
  isPainting = true;
  curVersionId = Math.random();
  ctx.beginPath();
  handleDraw(e.clientX, e.clientY, lineWidth);
};

const stopsDraw = () => {
  isPainting = false;
};

const handleDraw = (clientX, clientY, size) => {
  if (!isPainting) return false;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';

  ctx.strokeStyle = color;
  ctx.lineTo(clientX - size, clientY - size);
  ctx.stroke();
  ctx.moveTo(clientX - size, clientY - size);

  versions.push({
    x: clientX,
    y: clientY,
    curVersionId,
    lineWidth,
    size
  });
};

const handleColorPicker = (e) => {
  const buttons = document.querySelectorAll('.button-color');
  buttons.forEach((button) => {
    button.classList.remove('active');
  });

  color = e.target.getAttribute('data-color');

  e.target.classList.add('active');
};

const handleSizePicker = (e) => {
  const buttons = document.querySelectorAll('.button-size');
  buttons.forEach((button) => {
    button.classList.remove('active');
  });

  lineWidth = e.target.getAttribute('data-size');

  e.target.classList.add('active');
};

const handleClear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const handleClick = (e) => {
  if (e.target.classList.contains('button-color')) {
    handleColorPicker(e);
  } else if (e.target.classList.contains('button-size')) {
    handleSizePicker(e);
  } else if (e.target.classList.contains('button-clear')) {
    handleClear();
  }
};

document.addEventListener('click', handleClick);

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', (e) =>
  handleDraw(e.clientX, e.clientY, lineWidth)
);
canvas.addEventListener('mouseup', stopsDraw);
