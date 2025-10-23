const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// 처음 페이지에 들어갔을 때 localStorage를 참조해서 기존 todo 데이터가 있다면 가지고 와야겠네요.
let todos = JSON.parse(localStorage.getItem("todos")) || [];
//
//
//
//
console.log(todos); // JS 객체가 아니라 배열이라는 점에 주목할 필요 -> 맨 처음에 localStorage 를 뒤지면 빈 배열이 저장되겠죠. 이후에 배열 내부의 elemement 들에 객체를 추가했습니다.
// Todo 리스트를 불러오는 과정이 필요합니다.
// 페이지에 처음 들어가게 됐을 때의 로직이라고 생각하면 편합니다.
function renderTodos() {
  // 기존 todo list를 초기화 -> 추가했을 때 누적 안되게
  // 여러분들은 todoList =/= todosJson
  todoList.innerHTML = "";

  // todos 배열을 반복 돌려서 목록을 생성
  todos.forEach((todo, index) => {
    // todos의 반복을 돌면 내부 element가 있을건데, 그때마다
    // li 태그를 생성한다는 의미
    // 웬만하면 forEach() / map() / method에는 두 개 이상의 argument 가 요구된다고 알아두시면 속편합니다.
    // 보통은 첫 번째 한복문 돌 때의 element의 이름을 선언합니다.
    // 두 번째가 index 관련이라고 생각하시면 됩니다.

    // 각 todo는 JS 객체에 해당하는 거고, 이걸 페이지 상에서 보여주기 위해서는
    // ul 태그의 자식인 li 태그가 필요합니다.

    // 그럼 얘도 지역변수겠네요.
    const li = document.createElement("li");
    // document.createElement('li').className = 'todo-item';
    // 이렇게도 가능 하지만 너무 길어질 것 같으니깐 33번 라인처럼 작성
    // Javs의 객체에 field 값 대입하는 방법과 여전히 동일합니다.

    // li 태그만 만들었지 클래스 이름 안정했으니까
    li.className = "todo-item";

    if (todo.completed) {
      // localStorage의 'todos' key 내부를 확인했을 때 배열로 저장되어있고, 거기 내부에 JS 객체가 있는데, 그 객체가 현재 todo라고 이름 붙여져 있습니다.
      //그 todo 들은 text라는 key, completied 라는 key를 가지고 있습니다.
      // 그 completed 라는 자료형은 boolean이었고, 걔가 true / false 인지에 따라서 41번 라인의 실행 여부가 결정될 겁니다.
      // .css 파일에서 completend 속성 부분을 적용해주기 우해서 쓴 코드라인이 됩니다.
      // .completed가 true라면 할 일이 완료 되었음을 표시해주기 위해서 css 상 차이를 만들었는데, 그걸 적용하기 위한거죠
      li.classList.add("completed");
    }

    //41번 라인부터 46번라인 까지의 해석은 JS 객체 상의 key가 commpleted인 애의 value가 true라면 li 태그에 completed 라는 속서을 추가해주는데, 이게 추가되면 .css에서 정의도니 추가 스타일을 적용하기 위한 것입니다. (취소선, 배경색 등)

    // li 태그의 자식 요소로 input checbox / span / button 로 이루어져 있기 때문에 각각을 또 요소를 만들 필요가 있겠네요.

    // 체크 박스 - input 태그니까
    const checkbox = document.createElement("input");
    // 근데 얘는 type이 text가 아니라 checkbox니까
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed; // todo.completed는 boolean 자료형이죠.
    // checked가 자체는 true false 와 상관없이 계속 유지가 됩니다.
    // input의 type이 checkbox 라면 checked 하고 = ""가 없는 애가 있었습니다. <input type="checkbox" checked> 형태였습니다.

    // 텍스트 내용 생성 - span태그
    // div 가 아니라 span인 이유 자체도 생각할 필요가 있었습니다.
    // div - 컨텐츠가 있는 가로줄 전체가 영역
    // span - 컨텐츠가 있는 길이 만큼만 영역
    const span = document.createElement("span");
    span.className = "todo-text"; // 마찬가지로 css 적용을 위해서
    span.textContent = todo.text; // 내용이 있는 거니까 배열 내의 element인 JS객체의 text라는 키의 value 를 span 태그의 내부에 집어넣어서 페이지 상에 출력

    // 삭제 버튼 - button 태그
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&times"; // x 기호

    // 요소들을 li 변수에 추가해야 합니다. 왜? li 내부에 체크박스/스팬/버튼
    li.append(checkbox);
    li.append(span);
    li.append(deleteBtn);

    // 그리고 이 li를 <ul> 태그에 추가해야합니다.
    todoList.appendChild(li);

    // 이벤트리스너 추가
    // 체크박스 변경 이벤트
    checkbox.addEventListener("change", () => {
      todos[index].completed = checkbox.checked; // checkbox가 type이고, checked는 속성에 해당했습니다.
      // 완료 상태에 따라 CSS 클래스를 토글
      li.classList.toggle("completed", checkbox.checked);
      saveTodos();
    });

    // 삭제 버튼 클릭 이벤트
    deleteBtn.addEventListener("click", () => {
      // 삭제할 항목의 텍스트를 이용해서 배열 내에서 정확한 인덱스를 찾아낼겁니다.
      // 보통은 index로 내용을 확인하지만 계속 삭제를 하면 index 넘버가 바뀌겠죠
      // 그래서 input에 입력했던 내용을 근거로 index를 역으로 찾아낼 예정입니다.
      const itemText = span.textContent; // 얘를 쓰는 이유는 저희가 .trim() 쓰는 바람에 공백을 날렸기 때문입니다.

      // 배열 내에서의 내용과 span 태그 내에서의 내용이 같은 index를 뽑아내서 itemIndex 변수에 저장
      const itemIndex = todos.findIndex((item) => item.text === itemText);

      if (itemIndex !== -1) {
        // 일치하는 인덱스가 없으면 -1입니다.
        todos.splice(itemIndex, 1); // itemIndex에 해당하는 거 element 하나를 삭제

        // 주의 : splice() =/= slice()
        li.remove();
        saveTodos();
      }
    });
  });
}

// 이거 개중요 내일 시험 칠 때 회원가입 절차
function saveTodos() {
  // localStorage에 저장한다는 의미였으니까,
  localStorage.setItem("todos", JSON.stringify(todos));
  // 1번 매개변수 - key 입니다.
  // 2번 매개변수 - 그 키에 들어가는 value 입니다.
  localStorage.setItem("temp", "안녕"); // 6번 라인 때문에 항상 localStorage의 value가 배열이라고 오해살까봐 추가한 코드 -> 여기는 value
}

function addTodo() {
  const todoText = todoInput.value.trim(); // trim() 공백 제거 method였습니다. 이거 안 하면 추가 창에 공백만 쳐놔도 추가가 되기 때문에 그걸 막기 위해서 trim을 씀
  if (todoText === "") {
    alert("내용을 입력하세요 !");
    return; // 메서드를 종료시키겠다는 의미
  }

  // input 창에 내용이 있다면 내용이 들어갈 JS 객체 선언
  const newTodo = {
    text: todoText, // 이렇게 객체 선언
    completed: false, // 초기 생성시에 무조건 flase로 고정
  };

  // todos에 todo를 추가
  todos.push(newTodo);

  // 추가한 이후에 input 태그 내의 내용을 비우는 역할
  todoInput.value = "";

  renderTodos(); // 추가 버튼 누르고 나서 다시 리스트 (갱신된) 리스트를 가지고 와야 하니깐 renderTodos() 함수 호출
  saveTodos(); // 그치고 localStorage에도 저장 해줘야 하니까  saveTodos() 함수 호출

  // 그러면 이제 의문이 생길 수 있는 게 아니 어차피 renderTodos() 할 때 saveTodos()가 필수인 거 같은데 함께 묶어서 쓰면 안되나요.

  // method는 하나 당 기능 하나라고 생각하셔야 합니다.
  // 모듈화
}

// '추가' 버튼 클릭 이벤트
addBtn.addEventListener("click", addTodo); // button 태그에 onclick 속성입니다. -> 두 번째 argument로 addTodo 함수를 넣었는데, addTodo()가 아니라는 점에도 주목해야 한다고 했습니다.

// 엔터 키 입력 이벤트
todoInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo(); // input태그에 Enter키 입력을 감지하면 addTodo(); 함수를 호출할 것.
  }
});

// 새로고침했을 때 renderTodos()가 호출 되어야 함.
window.onload = renderTodos();
