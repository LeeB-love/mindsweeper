
// props (속성을 나타내는 데이터) 객체 인자를 받은 수 React element를 반환하는 함수
function Welcome(props){
    return <h1>Hello, {props.name}</h1>;
}

//React element는 사용자 정의 컴포넌트로도 나타낼 수 있다.
const element = <Welcome name='Nate'/>;

//React가 사용자 정의 컴포넌트로 작성한 element를 발견하면(Welcome 같은 것) 
//JSX 속성과 자식을 해당 컴포넌트에 단일 객체로 전달한다. 이러한 객체를 props라고 함.

//예)
const element2 = <Welcome name="Bongha"/>;
// ReactDOM.render(
//     element2,
//     document.getElementById('root')
// )

/*
    1. <Welcome name="Bongha"/> 엘리먼트로 ReactDOM.render() 함수를 호출한다.
    2. React는 {name: 'Bongha} 를 props로 하여 Welcome 컴포넌트를 호출한다.
    3. Welcome 컴포넌트는 결과적으로 <h1>Hello, Bongha</h1> 엘리먼트를 리턴한다.
    4. React DOM은 <h1>Hello, Bongha</h1> 엘리먼트와 일치하도록 DOM을 효율적으로 업데이트한다. 
*/


//컴포넌트 합성
/*
    컴포넌트는 자식의 출력에 다른 컴포넌트를 참조할 수 있다. 
    React 앱에서는 버튼, 폼, 다이얼로그, 화면 등 모든 것들이 컴포넌트로 표현된다. 
*/

// 예) Welcome을 여러번 렌더링하는 App컴포넌트
function App(){
    return (
        <div>
            <Welcome name='Sara'/>
            <Welcome name='Bong'/>
            <Welcome name='Lee'/>
        </div>
    );
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);


//컴포넌트 추출 : 하나의 큰 컴포넌트를 여러 개의 작은 컴포넌트로 나눌 수 있다. 
//예) author, text, date를 props를 통해 받은 후 보여주는 component. 
//각 구성요소들이 중첩구조로 이루어져 있어 변경이 힘들수도 있다.
// function Comment(props){
//     return (
//         <div className="Comment">
//             <div className="UserInfo">
//                 <img className="Avatar"
//                     src={props.author.avatarUrl}
//                 />
//                 <div className="UserInfo-name">
//                     {props.author.name}
//                 </div>
//             </div>
//             <div className="Comment-text">
//                 {props.text}
//             </div>
//             <div className="Comment-date">
//                 {formatDate(props.date)}
//             </div>
//         </div>
//     );
// }

//위 의 컴포넌트를 분리시키기
//1. Avatar
//author에서 user로 변경된 이유: Avatar는 자신이 Comment 내에서 렌더링 된다는 것을 알 필요가 없기 때문에 Comment 
//지엽적인 author에서 좀 더 일반적인 user로 변경
function Avatar(props){
    return(
        <img className="Avatar" src={props.user.Avatar} />
    );
}

// function Comment(props){
//     return (
//         <div className="Comment">
//             <div className="UserInfo">
//                 <Avatar user={props.author}/>
//                 <div className="UserInfo-name">
//                     {props.author.name}
//                 </div>
//             </div>
//             <div className="Comment-text">
//                 {props.text}
//             </div>
//             <div className="Comment-date">
//                 {formatDate(props.date)}
//             </div>
//         </div>
//     );
// }

//2. UserInfo
function UserInfo(props){
    return(
        <div className="UserInfo">
        <Avatar user={props.user}/>
        <div className="UserInfo-name">
            {props.user.name}
        </div>
    </div>
    )
}

//단순해진 Comment Component
function Comment(props){
    return (
        <div className="Comment">
            <UserInfo user={props.author}/>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    );
}


/*
※ 주의 props는 읽기전용이다.
함수 컴포넌트나 클래스 컴포넌트 모드 컴포넌트 자체 props를 수정해서는 안된다. 
function withdraw(account, amount) {
  account.total -= amount;
}
위의 함수처럼 인자를 변경하여 활용하면 안된다.
모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야한다. 
*/