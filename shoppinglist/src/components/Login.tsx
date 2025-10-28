import { ChangeEvent, useState } from "react";
import {
  Button,
  TextField,
  Snackbar,
  Divider,
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";
import { AccountCredentials } from "../types";
import { login, authenticateWithGoogleToken } from "../api/shoppingapi";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

type LoginProps = {
  loginSuccess: () => void;
};

function Login({ loginSuccess }: LoginProps) {
  const [user, setUser] = useState<AccountCredentials>({
    username: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Login failed");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  // 아이디/비밀번호 로그인
  const handleUsernamePasswordLogin = () => {
    setLoading(true); // 로딩 시작
    login(user)
      .then((authorizationHeader) => {
        sessionStorage.setItem("jwt", authorizationHeader);
        loginSuccess();
      }) // 이거 위에 promise로 써서 then 쓸 수 있는 거임
      .catch((err) => {
        console.error("Login error : ", err);
        setErrorMsg(
          err.message || "예상하지 못한 로그인 관련 에러가 발생하였습니다."
        );
        setOpen(true);
      })
      .finally(() => {
        setLoading(false); // 로딩 종료
      });
  };

  // Google 로그인 관련
  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    console.log(
      "Google Login Success(Frontend 상황에서 : ",
      credentialResponse
    );
    if (credentialResponse.credential) {
      setLoading(true);
      try {
        // Google ID 토큰을 백엔드로 보내서 JWT 받아오는 과정
        const backendJwt = await authenticateWithGoogleToken(
          credentialResponse.credential
        );
        sessionStorage.setItem("jwt", backendJwt);
        loginSuccess();
      } catch (error: any) {
        console.error(
          "구글 로그인 후에 백엔드 부분에서 인증 실패했습니다.",
          error
        );
        setErrorMsg(
          `구글 로그인은 성공했는데 백엔드에서 터졌습니다. ${
            error?.message || "알 수 없는 에러"
          }`
        );
      } finally {
        setLoading(false);
      }
    } else {
      console.error("응답 결과에서 Google Credential을 찾을 수 없습니다.");
      setErrorMsg("Google Login Failed : Credential Not Found😱😱");
      setOpen(true);
    }
  };

  // Google 로그인 실패 관련 callback
  const handleGoogleLoginError = () => {
    console.error("Google Login Failed (Frontend)");
    setErrorMsg(
      "구글 로그인 자체가 실패했습니다. 다시 시도하거나 좀 있다 시도하세요."
    );
    setOpen(true);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !loading) {
      // 로딩 중일 때는 엔터키로 로그인 못하게.
      handleUsernamePasswordLogin();
    }
  };

  return (
    <>
      <Stack spacing={2} alignItems="center" mt={10}>
        <h2>Loghn</h2>
        <TextField
          name="username"
          label="Username"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          autoFocus
          sx={{ width: "300px" }}
        />

        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          sx={{ width: "300px" }}
        />
        <Button> {}</Button>
      </Stack>
      <Snackbar></Snackbar>
    </>
  );
}

export default Login;
