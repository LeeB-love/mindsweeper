import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import './App.css';

class Level_select extends Component {
  constructor(props) {
    super(props);
    this.handleRadio = this.handleRadio.bind(this);
    this.state = {
      //상태에서 기본으로 선택된 라디오 버튼 설정
      game_level:'easy', // easy normal hard
    };
  }

  handleRadio=(e)=>{
    let obj = {} // erase other radios
    //target.checked 속성을 이용해서 라디오 버튼이 선택되었는지 여부 확인
    obj[e.target.value] = e.target.checked // true
    this.setState(()=>({
      game_level:e.target.value
    }))
    console.log(`${e.target.value}`);
  }

  //폼에 submit 이벤트가 발행했을때 호출되는 함수 
  handleSubmit=(e)=>{
      //page가 전환되는 것을 방지하기 위해 이벤트 객체의 preventDefaul() 함수를 호출하여 기본동작 막기
      e.preventDefault();
      //폼에 입력한 값을 읽어온다
      const id=this.id.value;
      //info 에 `아이디:${id}` 문자열을 저장
      const info=`아이디:${id}`;
      // ref가 info인 요소의 innerText를 info로 대체
      this.info.innerText=info;

      if(this.state.game_level === "easy"){
        this.props.onChange(1,9,9,id,7);
      }
      else if(this.state.game_level === "nomal"){
        this.props.onChange(1,16,16,id,30);
      }
      else if(this.state.game_level === "hard"){
        this.props.onChange(1,30,16,id,100);
      }
  }

  render() {
      return (
          <div className="container">
              <h1>지뢰찾기</h1>
              <form onSubmit={this.handleSubmit}>
                      <label htmlFor="id">아이디</label>
                      <input ref={(ref)=>{this.id=ref;}} type="text"  className="form-control" name="id" /><br/>
                      
                      <label htmlFor="game_level">게임 난이도</label><br/>
                      <input type="radio" 
                        name="game_level" 
                        value="easy" 
                        checked={this.state.game_level==='easy'} 
                        onChange={this.handleRadio} /> 초급 (9x9)

                      <input type="radio" 
                        name="game_level" 
                        value="nomal" 
                        checked={this.state.game_level==='nomal'} 
                        onChange={this.handleRadio} /> 중급 (16x16)

                      <input type="radio" 
                        name="game_level" 
                        value="hard" 
                        //상태 객체 또는 상태 객체에 있는 한 값에서 필요한 값을 가져와서 사용하기
                        checked={this.state.game_level==='hard'} 
                        //target.value로 라디오 버튼의 value를 확인할 수 있으므로 동일한 onChange 이벤트 핸들러
                        
                        onChange={this.handleRadio} /> 고급 (30x16) <br/>

                  <button className="startBtn" type="submit">게임시작</button>
              </form>
              <p ref={(ref)=>{this.info=ref;}}></p>
          </div>
      );
  }
}


//버튼 렌더링
//gameState 가 gameover일 경우, disabled 속성 넣기
class Square extends React.Component {
  render() {
    if(this.props.open == true || this.props.display != ''){
      return (  
        <button 
          className="square" 
          onClick = { (e) => this.props.handleLeftClick(e) } //좌클릭
          onContextMenu = { (e) => this.props.handleRightClick(e) } //우클릭
          onAuxClick = { (e) => this.props.handleWheelClick(e) } //휠클릭
        >
          {this.props.value}
        </button>
      );
    }
    else {
      return (  
        <button 
          className="square-no-open" 
          onClick = { (e) => this.props.handleLeftClick(e) } //좌클릭
          onContextMenu = { (e) => this.props.handleRightClick(e) } //우클릭
          onAuxClick = { (e) => this.props.handleWheelClick(e) } //휠클릭
          disabled={this.props.gameState == 'gameover'}
        >
        </button>
      );
    }
  }
}


class GameStateBtn extends React.Component{
  
  reset = ()=>{
    //this.props.onChange(1,16,16,id,30);
  } 
  
  render(){
    if(this.props.gameState == 'gameover'){
      return <button className="btn-face" onClick={this.reset} >😭</button>
    }
    if(this.props.gameState == 'gamewin'){
      return <button className="btn-face" onClick={this.reset}>😊</button>
    }
    return <button className="btn-face">😉</button>
  }
}

class Board extends React.Component{
  constructor(props){ 
    super(props);
    this.state = {
      //1. width*height 만큼 셀 생성
      square: new Array(this.props.width*this.props.height).fill(null).map(_=>({btnClickCount:0, display:'', open:false})),
      remainMines: this.props.mine,
      unopenCell: this.props.width*this.props.height,
    }
    this.plantBombs(this.props.mine);
    this.countBomb(this.props.width,this.props.height);
  }

  open = (x,y) => {
    const i =x+this.props.width*y;

    if(this.state.square[i].number != 0 || this.state.square[i].open == true){
      this.state.square[i].open = true;
      return;
    }
    this.state.square[i].open = true;
    
    if(x-1>=0 && y-1 >=0){
      this.open(x-1, y-1);
    }
    if(y-1 >= 0){
      this.open(x, y-1);
    }
    if(x+1<this.props.width && y-1 >=0){
      this.open(x+1, y-1);
    }
    if(x-1>=0){
      this.open(x-1, y);
    }
    if(x+1<this.props.width){
      this.open(x+1, y);
    }
    if(x-1>=0 && y+1<this.props.height){
      this.open(x-1, y+1);
    }
    if(y+1<this.props.height){
      this.open(x, y+1);
    }
    if(x+1<this.props.width && y+1<this.props.height){
      this.open(x+1, y+1);
    }
  }


  burstAllMines = (x,y,width,height)=>{
    //지뢰 밟으면 - 모든 지뢰가 다 터지도록 변경&gameState 를 gameover로 바꾸기
    let i = x+width*y
    if(this.state.square[i].mine == true){  
      for(let y=0; y<height; y++) {
        for(let x=0; x<width; x++) {
          if(this.state.square[x+width*y].mine == true){
            this.state.square[x+width*y].open = true;
            this.props.gameStateChange('gameover');
          }
        }
      }
    }
    this.forceUpdate();
  }



  handleLeftClick = (e,i) => {
    let width = this.props.width;
    let height = this.props.height;
    let x = i % width;
    let y = Math.floor(i/width);
    console.log(e,x,y);

    if(this.state.square[i].display != 'flag'){
      this.open(x,y)
    }

    this.burstAllMines(x,y,width,height);
  }
  
  
  handleRightClick = (e,i) => {
    e.preventDefault();
    // this.state = {
    //   square:[]
    // };
    this.setState(({square})=>{
      square[i].btnClickCount ++;
      if(square[i].btnClickCount === 1){
        square[i].display = 'flag'
        if(square[i].mine == true){
          this.state.remainMines--;
          if(this.state.remainMines === 0){
            this.props.gameStateChange('gamewin')
          }
        }
      }
      else if(square[i].btnClickCount === 2){
        square[i].display = 'question'
      }
      else if(square[i].btnClickCount === 3){
        square[i].display = '';
        square[i].btnClickCount = 0;
      }
      return {square};
    });
    
  }

  handleWheelClick = (e,i) => {
    let width = this.props.width;
    let height = this.props.height;
    let x = i % width;
    let y = Math.floor(i/width);

    if(e.button == 1){
      
      let count = 0;
      
      //1. 주변 8칸의 깃발개수를 샌다.
      if(x-1>=0 && y-1>=0 && this.state.square[(x-1)+width*(y-1)].display == 'flag'){
        count++
      }
      if(y-1>=0&& this.state.square[x+ width*(y-1)].display == 'flag'){
        count++
      }
      if(x+1<width && y-1>=0&& this.state.square[(x+1)+width*(y-1)].display == 'flag'){
        count++
      }
      if(x-1>=0&&this.state.square[(x-1) + width*y].display == 'flag'){
        count++
      }
      if(x+1<width && this.state.square[(x+1) + width*y].display == 'flag'){
        count++
      }
      if(x-1>=0 && y+1<height&&this.state.square[(x-1) + width*(y+1)].display == 'flag'){
        count++
      }
      if(y+1<height && this.state.square[x + width*(y+1)].display == 'flag'){
        count++
      }
      if(x+1<width && y+1<height && this.state.square[(x+1) + width*(y+1)].display == 'flag'){
        count++
      }

      //2. count : 주변 8칸의 깃발개수.. count 와 본인칸 숫자를 비교한다.
      if(count === this.state.square[i].number){
        // 3. 8칸을 전부 연다.
        console.log("깃발 개수와 셀 숫자가 같습니다.")

        if(x-1>=0 && y-1>=0 && this.state.square[(x-1)+width*(y-1)].display != 'flag'){
          this.open(x-1,y-1);
          this.burstAllMines(x-1,y-1,width,height);
        }
        if(y-1>=0&& this.state.square[x+ width*(y-1)].display != 'flag'){
          this.open(x,y-1)
          this.burstAllMines(x,y-1,width,height);
        }
        if(x+1<width && y-1>=0&& this.state.square[(x+1)+width*(y-1)].display != 'flag'){
          this.open(x+1,y-1)
          this.burstAllMines(x+1,y-1,width,height);
        }
        if(x-1>=0&&this.state.square[(x-1) + width*y].display != 'flag'){
          this.open(x-1,y)
          this.burstAllMines(x-1,y,width,height);
        }
        if(x+1<width && this.state.square[(x+1) + width*y].display != 'flag'){
          this.open(x+1,y)
          this.burstAllMines(x+1,y,width,height);
        }
        if(x-1>=0 && y+1<height&&this.state.square[(x-1) + width*(y+1)].display != 'flag'){
          this.open(x-1,y+1)
          this.burstAllMines(x-1,y+1,width,height);
        }
        if(y+1<height && this.state.square[x + width*(y+1)].display != 'flag'){
          this.open(x,y+1)
          this.burstAllMines(x,y+1,width,height);
        }
        if(x+1<width && y+1<height && this.state.square[(x+1) + width*(y+1)].display != 'flag'){
          this.open(x+1,y+1)
          this.burstAllMines(x+1,y+1,width,height);
        }
        this.forceUpdate();
      }
      else{
        return;
      }
    }
    else{
      return;
    }
  }

  // createBomb() : 폭탄 하나 심기
  createBomb = () => {
    // min 부터 max 사이에 있는 정수 중 하나를 임의로 추출
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    // 폭탄의 위치 랜덤으로 뽑기
    let bombPosition = getRandomInt(0, this.props.width*this.props.height);
    // 만약에 square에 폭탄이 들어가있으면 없을 때 까지 다시 위치 뽑기
    if(this.state.square[bombPosition].mine === true){
      while(this.state.square[bombPosition].mine !== true){
        bombPosition = getRandomInt(0, this.props.width*this.props.height)
      }
    }
    // square에 폭탄 삽입
    this.state.square[bombPosition].mine=true;
  }

  plantBombs = (n) => {
    for(let i = 0; i< n; i++){
      this.createBomb();
    }
  }

  //x,y 주변 8칸 지뢰개수
  countBomb = (width,height) => {
    let count = 0;
    for(let y=0; y<height; y++){
      for(let x=0; x<width; x++){
        if(this.state.square[x+width*y].mine==true){
          continue;
        }
        if(x-1>=0 && y-1>=0 && this.state.square[(x-1)+width*(y-1)].mine == true){
          count++
        }
        if(y-1>=0&& this.state.square[x+ width*(y-1)].mine == true){
          count++
        }
        if(x+1<width && y-1>=0&& this.state.square[(x+1)+width*(y-1)].mine == true){
          count++
        }
        if(x-1>=0&&this.state.square[(x-1) + width*y].mine == true){
          count++
        }
        if(x+1<width && this.state.square[(x+1) + width*y].mine == true){
          count++
        }
        if(x-1>=0 && y+1<height&&this.state.square[(x-1) + width*(y+1)].mine == true){
          count++
        }
        if(y+1<height && this.state.square[x + width*(y+1)].mine == true){
          count++
        }
        if(x+1<width && y+1<height && this.state.square[(x+1) + width*(y+1)].mine == true){
          count++
        }
        this.state.square[x+width*y].number = count;
        count=0
      }
    }
  }



  //Square component의 button의 출력값(value)로 i 전달
  renderSquare = (i,value)=>{
    return (
      <Square 
      value={value}
      gameState={this.props.gameState}
      remainMines={this.state.remainMines}
      unopenCell={this.state.unopenCell}
      handleWheelClick={(e) =>this.handleWheelClick(e,i) } 
      handleLeftClick={(e) =>this.handleLeftClick(e,i) } 
      handleRightClick={(e) =>this.handleRightClick(e,i) }
      open={this.state.square[i].open}
      display={this.state.square[i].display}
      />      
    )   
  }

  render() {
    const {width,height} = this.props;
    const board = [];
    
    for(let y=0; y<height; y++) {
      const row = [];
      for(let x=0; x<width; x++) {
        row.push(
            <div key={[y,x].join(':')}>
               {
                this.renderSquare(
                  x+width*y,
                  this.state.square[x+width*y].open == true ? 
                  (this.state.square[x+width*y].mine == true ? "💣": (this.state.square[x+width*y].number == 0 ? "" : this.state.square[x+width*y].number)) :
                  (this.state.square[x+width*y].display == 'flag' ? "🚩":(this.state.square[x+width*y].display == 'question' ? "❔":""))
                )
               }
            </div>);
      }
      board.push(<div key={y} className="board-row">{row}</div>);
      }
    return (
      <div
      className={'b'}
      // onClick={()=>{
        // this.countBomb(this.props.width,this.props.height);
        // this.forceUpdate()
      // }}
      >
        {board}
      </div>
    )
  }
}



//게임판 렌더링
class Game extends React.Component {
  constructor(props){
    super(props);
    this.state  = {
    }
  }
  render() {
      return (
      <>
      <GameStateBtn 
        gameState={this.props.gameState}
        mine={this.props.mine}/>
      <Board 
        width={this.props.width} 
        height={this.props.height} 
        mine={this.props.mine}
        gameState={this.props.gameState}
        gameStateChange={(gameState)=>this.props.gameStateChange(gameState)}
      />
      </>  
      )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      mode: 0,
      width: 0,
      height: 0,
      id: "",
      mine: 0,
      time: 0,
      gameState: "",
    }
  }
  render(){
      if(this.state.mode === 0){
        return <Level_select onChange={(mode,width,height,id,mine)=>this.setState({mode,width,height,id,mine})}/>;
      }
      else if(this.state.mode === 1){
        return <Game 
                width={this.state.width} 
                height={this.state.height} 
                mine={this.state.mine} 
                time = {this.state.time}
                gameState={this.state.gameState}
                gameStateChange={(gameState)=>this.setState({gameState})}
                />
      }
      else if(this.state.mode === 2){
        return null;
      }
  }
}




ReactDOM.render(
  <App />,
  document.getElementById('root')
);




