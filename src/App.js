// 로고 가져오기
import logo from './logo.svg';
//App.css 가져오기
import './App.css';

//App 컴포넌트
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

//App 컴포넌트 export - 내보내야 외부에서 사용 가능
export default App;
