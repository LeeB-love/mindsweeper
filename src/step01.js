/*
JSX 중괄호 안에는 JavaScript 표현식을 넣을 수 있다.
컴파일이 끝나면 JSX 표현식이 정규 JavaScript 함수 호출이 되고, JavaScript 객체로 인식된다. 
따라서 JSX를 if 구문이나 loop 안에 사용하거나, 변수에 할당하거나, 인자로서 사용하거나, 함수로부터 반환할 수 있다.  
*/


//name이라는 변수를 선언한 후 
const name = 'BongHa';
//중괄호로 감싸 JSX 안에 사용함
const element1 = <h1>Hello, {name}</h1>

function formatName(user){
    return user.firstName + ' ' + user.lastName;
};

const user = {
    firstName : 'Lee',
    lastName : 'Bongha'
};

const element2 = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
)

//속성에 따옴표를 이용해서 리터럴 정의 가능
const element3 = <div tabIndex="0"></div>
//중괄호를 사용해서 속성에 JavaScript 표현식 삽입가능 (속성에 JavaScript 표현식 사용시, 따옴표 생략. 중괄호 사용)
const element4 = <img src={user.avatarUrl}></img>


//JSX를 React.crateElement() 호출로 컴파일. element5와 element6은 같다. 
const element5 = (
    <h1 className="greeting">
        Hello, world!
    </h1>
)
const element6 = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
)

//React.createElement()는 다음과 같은 객체를 생성한다. (element6 == element7)
const element7 = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world!'
    }
}

// 위와 같은 객체를 React element라고 하며, React 앱의 가장 작은 단위이다. 
// 화면에서 보고 싶은 것을 나타내는 표현.
// React는 이 객체를 읽어서, DOM을 구성하고 최신 상태로 유지하는 데 사용한다. 



ReactDOM.render(
    element1,
    element2,
    document.getElementById('root') //이게 뭐지???
);

