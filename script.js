window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Canvas Settings
        ctx.fillStyle = 'darkslategrey';
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shaddowOffsetX = 10;
        ctx.shaddowOffsetY = 5;
        ctx.shadowBlur = 10;

    // Control Settings
        const randomizeButton = document.getElementById('randomizeButton');
        const resetButton = document.getElementById('resetButton');
        const slider_spread = document.getElementById('spread');
        const label_spread = document.querySelector('[for="spread"]');
        slider_spread.addEventListener('change', function(e){
            spread = e.target.value;
            updateSliders();
            drawFractal();
        });
        slider_sides = document.getElementById('sides');
        label_sides = document.querySelector('[for="sides"]');
        slider_sides.addEventListener('change', function(e){
            sides = e.target.value;
            updateSliders();
            drawFractal();
        })


    // Effect Settings
        // Determines size of the canvas based on device used
        let size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
        
        // Randomizes color of the fractal
        let color = 'hsl('+ Math.random() * 360 + ', 100%, 50%)';
        // Scale Determines size of the segments
        let scale = 0.4;
        let lineWidth = Math.floor(Math.random() * 20 + 10);
        
        let sides = 5;
        // Spread determines angle or radians from the parent branch
        let spread = 0.1;

        // Max Level determines the dept of the fractal
        const maxLevel = 3;
        // Branches determines number of branches created within the fractal
        const branches = 5;

    // Draw Branches
        function drawBranch(level){
            if (level > maxLevel) return;
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(size, 0);
            ctx.stroke();
            
            for (let i = 0; i < branches; i++){
                ctx.save();
                ctx.translate(size - (size/branches )* i, 0);
                ctx.rotate(spread);
                ctx.scale(scale, scale);
                drawBranch(level + 1);
                ctx.restore();
                
                ctx.save();
                ctx.translate(size - (size/branches )* i, 0);
                ctx.rotate(-spread);
                ctx.scale(scale, scale);
                drawBranch(level + 1);
                ctx.restore(); 
            }
            // Add Circle Shape
            ctx.beginPath();
            ctx.arc(0,size,size * 0.1,0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw Fractal   
        function drawFractal() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = lineWidth;
            ctx.save();
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            ctx.translate(canvas.width/2,canvas.height/2);
            
            for (let i = 0; i < sides; i++){ 
                ctx.rotate((Math.PI * 2) / sides);
                drawBranch(0);
        }
        ctx.restore();
    }
    drawFractal();

    // Controls
        function randomizeFractal() {
            lineWidth = Math.floor(Math.random() * 20 + 10);
            sides = Math.random() * 7 + 2;
            scale = Math.random() * 0.4 + 0.4;
            spread = Math.random() * 2.9 + 0.1;
            color = 'hsl('+ Math.random() * 360 + ', 100%, 50%)';
        }
        randomizeButton.addEventListener('click', function(){
            randomizeFractal();
            updateSliders();
            drawFractal();
        });

        function resetFractal() {
            lineWidth = 10;
            sides = 5;
            scale = 0.5;
            spread = 0.7;
            color = 'hsl(45, 100%, 50%)';
        }
        resetButton.addEventListener('click', function(){
            resetFractal();
            updateSliders();
            drawFractal();
        });

        function updateSliders(){
            slider_spread.value = spread;
            label_spread.innerText = 'Spread: ' + Number(spread).toFixed(1);
            slider_sides.value = sides;
            label_sides.innerText = 'Sides: ' + Number(sides).toFixed(1);
        }
        updateSliders();

        window.addEventListener('resize', function(){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            size = canvas.width < canvas.height ? canvas.width * 0.3 : canvas.height * 0.3;
            ctx.shadowColor = 'rgba(0,0,0,0.7)';
            ctx.shaddowOffsetX = 10;
            ctx.shaddowOffsetY = 5;
            ctx.shadowBlur = 10;
            
            drawFractal();
        });

  });