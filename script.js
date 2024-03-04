window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    

    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    

    const maxLevel =4;
    const branches = 2;
    let size = 200;
    let sides = 5;
    let scale = 0.5;
    let spread = 0.1;
    let color = 'hsl('+Math.random()*360+',100%,50%)';
    let lineWidth = Math.floor(Math.random()*20+10);
    


    //controls
    const randomizeButton = document.getElementById('randomizeButton');
    randomizeButton.style.backgroundColor = color;


    function drawBranch(level){
        if(level>maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        ctx.stroke();
        
        for(let i=0;i<branches;i++)
        {
            ctx.save();

            ctx.translate(size-(size/branches)*i,0);
            ctx.scale(scale,scale);

            ctx.save();
            ctx.rotate(spread);
            drawBranch(level+1);
            ctx.restore();
    
            ctx.save();
            ctx.rotate(-spread); 
            drawBranch(level+1);
            ctx.restore();

            ctx.restore();
        }
    }
    drawBranch(0);

    function drawFractal()
    {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.translate(canvas.width/2,canvas.height/2);
        for(let i =0;i<sides;i++)
        {
            ctx.rotate((Math.PI*2)/sides);
            drawBranch(0);
        }
        ctx.restore();
    }
    drawFractal();

    function randomizeFractal()
    {
        sides = Math.floor(Math.random()*7+2);
        scale = Math.random()*0.2+0.4;
        spread = Math.random()*2.9+3;
        color = 'hsl('+Math.random()*360+',100%,50%)';
        lineWidth = Math.floor(Math.random()*20+10);
        randomizeButton.style.backgroundColor = color;
    }
    randomizeButton.addEventListener('click',
    function()
    {
        randomizeFractal();
        drawFractal();
    });


    window.addEventListener('resize',function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawFractal();
    });
});