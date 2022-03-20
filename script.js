window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Canvas Settings
        ctx.filLStyle = 'green';
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 30;
        ctx.lineCap = 'round';
        
    // Effect Settings
        let size = 200;
        
        ctx.beginPath();
        ctx.moveTo(canvas.width/2,canvas.height/2);
        ctx.lineTo(size,canvas.height/2);
        ctx.stroke();
  })