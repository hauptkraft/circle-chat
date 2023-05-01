console.log('js connected');

const bodyElement = document.getElementById('wrapper');
const unit = document.getElementById('unit');

unit.style.backgroundColor = Math.random() < 0.5 ? 'red' : 'green'

const ws = new WebSocket('ws://localhost:2346');

bodyElement.addEventListener('keyup', e => {
    let top = unit.style.top ? unit.style.top : 0;
    let left = unit.style.left ? unit.style.left : 0;
    const step = 5;
    // console.log(e.code);
    if(e.code == 'ArrowUp'){
        unit.style.top = parseInt(top) - step + 'px';
    }else if(e.code == 'ArrowDown'){
        unit.style.top = parseInt(top) + step + 'px';
    }else if(e.code == 'ArrowLeft'){
        unit.style.left = parseInt(left) - step + 'px';
    }else if(e.code == 'ArrowRight'){
        unit.style.left = parseInt(left) + step + 'px';
    }

    let positionData = {
        top: unit.style.top,
        left: unit.style.left,
    };

    ws.send(JSON.stringify(positionData));
});

ws.onmessage = response => {
    let positionData = JSON.parse(response.data);
    console.log(positionData);
    unit.style.top = positionData.top;
    unit.style.left = positionData.left;
}
