import { useState, ChangeEvent } from "react";
import axios from "axios";
import { Button, TextField, Stack } from "@mui/material";

type User = {
  // Request DTO 백엔드의 AccountCredentials의 username,password랑 연결해서 확인
  username: string;
  password: string;
};

function Login() {
  const [user, setUser] = useState<User>({
    username: "",
    password: "",
  });

  const [isAuthenticated, setAuth] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = () => {
    // 일부러 템플릿 리터럴(template literal)로 안 썼습니다.
    axios
      .post(import.meta.env.VITE_API_URL + "/login", user, {
        headers: { "Content-Type": "application/json" },
      }) // 이미 여기서 로그인 성공 이 밑은 로그인 성공 후 토큰을 가지고 오는 거
      .then((res) => {
        const jwtToken = res.headers.authorization;
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken); // 앞이 키, 뒤가 value
          setAuth(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Stack spacing={2} alignItems="center" mt={2}>
      <TextField name="username" label="Username" onChange={handleChange} />
      <TextField
        type="password"
        name="password"
        label="Password"
        onChange={handleChange}
      />
      <Button variant="outlined" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Stack>
  );
}

export default Login;
