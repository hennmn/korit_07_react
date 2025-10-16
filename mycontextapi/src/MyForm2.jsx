import { useState } from "react";

function MyForm2() {
  const [text, setText] = useState("");

  // input field에 입력한 것을 submit 하면 날려보낼 수 있도록 하는 함수를 작성
  // const handleChange = (event) => {
  //   setText(event.target.value); // 이 메서드와 구현부는 거의 고정
  //   console.log(text);
  // };

  const handleSubmit = (event) => {
    // 다른 폼으로 넘어가지 않기 위해서 달아주는 것
    alert(`'${text}'라고 입력하셨습니다.`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
      <br />
      <br />
      <input type="submit" value="클릭하세요.⭐" />
    </form>
  );
}

export default MyForm2;
