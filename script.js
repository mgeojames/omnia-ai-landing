// --- Animated hero data wave ---
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');
let w, h, t = 0;
function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function drawWave(){
  ctx.clearRect(0,0,w,h);
  t += 0.015;
  ctx.beginPath();
  for(let x=0;x<w;x++){
    let y = h/2 + Math.sin(x*0.01 + t)*20 + Math.sin(x*0.003 + t*2)*15;
    ctx.lineTo(x,y);
  }
  ctx.strokeStyle = 'rgba(198,137,255,0.4)';
  ctx.lineWidth = 2;
  ctx.stroke();
  requestAnimationFrame(drawWave);
}
drawWave();

// --- AI Insight Simulator ---
const ctxChart = document.getElementById('insightChart').getContext('2d');
const data = {
  labels: Array.from({length:28},(_,i)=>i+1),
  datasets:[
    {
      label:'HRV (ms)',
      borderColor:'#4B1C71',
      data: [],
      tension:0.4,
      fill:false
    },
    {
      label:'Temp (°C)',
      borderColor:'#C689FF',
      data: [],
      tension:0.4,
      fill:false
    },
    {
      label:'Mood Stability (%)',
      borderColor:'#A455F1',
      data: [],
      tension:0.4,
      fill:false
    }
  ]
};

// generate mock values
for(let i=1;i<=28;i++){
  data.datasets[0].data.push(40 + Math.sin(i/3)*15 + 5);
  data.datasets[1].data.push(36.5 + Math.sin((i-5)/4)*0.3);
  data.datasets[2].data.push(80 + Math.sin((i-10)/5)*10);
}

const chart = new Chart(ctxChart, {
  type:'line',
  data,
  options:{
    responsive:true,
    plugins:{legend:{display:true}},
    scales:{y:{beginAtZero:false}}
  }
});

const dayRange = document.getElementById('dayRange');
const dayLabel = document.getElementById('dayLabel');
dayRange.addEventListener('input',()=>{
  dayLabel.textContent = dayRange.value;
  const day = parseInt(dayRange.value);
  chart.tooltip.setActiveElements([
    {datasetIndex:0,index:day-1},
    {datasetIndex:1,index:day-1},
    {datasetIndex:2,index:day-1}
  ]);
  chart.update();
});

// ---- Aurora parallax (very subtle) ----
const aurora = document.querySelector('.aurora-bg');
window.addEventListener('scroll', () => {
  const y = window.scrollY * 0.02; // adjust for more/less
  aurora.style.transform = `translateY(${y}px)`;
});

