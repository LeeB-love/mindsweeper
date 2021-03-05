// HTML 파일 어딘가에 <div>가 있다고 가정하자. 
<div id="root"></div>  // 이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 때문에 이를 'root DOM 노드'라 한다.

/*
React로 구현된 애플리케이션은 보통 하나의 루트 DOM 노드가 있다. 
React 엘리먼트를 루트 DOM 노드에 렌더링하라면 ReactDOM.render()로 전달하면 된다.
ReactDOM은 변경될 엘리먼트와 이전의 엘리먼트를 비교해서 필요한 부분만 DOM을 업데이트한다. 
*/

const element = <h1>Hello, world!</h1>
ReactDOM.render(element, document.getElementById('root'));

// ※ React element 는 불변객체이다. element를 생성한 이후엔 해당 엘리먼트의 자식이나 속성을 변경할 수 없다. 
// 따라서, UI를 업데이트하고 싶다면, 새로운 element를 생성하고 이를 ReactDOM.render()로 전달하는 것이다.

//예) setInterval() 콜백을 이용해 초마다 ReactDOM.render()를 호출한다.
function tick(){
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
    ReactDOM.render(element, document.getElementById('root'));
}
setInterval(tick, 1000);



