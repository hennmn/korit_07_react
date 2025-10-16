import { useState } from "react";

function MyForm4() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // 근데 잘 생각해보면 alert을 띄우는 건 학습상황이라서 그렇지 실제 얘가 하는 역할을 form 태그의 preventDefault()를 쓰기 위해서에 가깝습니다.
  const handleSubmit = (event) => {
    alert(`'${firstName} ${lastName}'라고 입력하셨습니다.`);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>First Name : </label>
      <input
        type="text"
        name="firstName"
        onChange={(e) => setFirstName(e.target.value)} // 이런식으로 줄여서 쓰는 것도 가능
        value={firstName}
      />
      <br />
      <label>Last Name : </label>
      <input
        type="text"
        name="lastName"
        onChange={(event) => setLastName(event.target.value)}
        value={lastName}
      />
      <br />
      <label>Email : </label>
      <input
        type="email"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        value={email}
      />
      <br />
      <br />
      <input type="submit" value="제출하세요 😶‍🌫️💌" />
    </form>
  );
}

export default MyForm4;
