import { FC, useCallback } from "react";
import { usePagesReact } from "@/hooks/usePages.ts";
import "./Login.scss";
import { useAppDispatch, userActions } from "@/stores/redux";
import { useTokenReact } from "@/hooks/useToken.ts";
import { useReactive } from "ahooks";
import { useFetchDataReact } from "@/hooks/useFetchData.ts";
import { Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Logger from "@/utils/logger.ts";
import AppSettings from "@/settings";

type props = object;
const { setLogin } = userActions;
const Login: FC<props> = () => {
  const router = usePagesReact();
  const { HasToken } = useTokenReact();
  HasToken && router.push("/").then();
  const { fetchData, API } = useFetchDataReact();
  const loginInfo = useReactive({
    username: "",
    password: ""
  });
  const IsFocus = useReactive({
    username: false,
    password: false
  });
  const loading = useReactive({ ok: false });
  const dispatch = useAppDispatch();
  const submit = useCallback(async () => {
    if (loginInfo.username.trim().length < 4 || loginInfo.password.trim().length < 6) {
      return Logger.Message.Error("用户名或密码长度不够！");
    }
    loading.ok = true;
    await fetchData(
      API.reqLogin,
      [loginInfo],
      (res) => {
        if (res.data.admin) {
          dispatch(setLogin(res.data));
          Logger.Message.Success("登录成功，欢迎回来" + res.data.username);
          setTimeout(() => {
            router.push("/").then();
          }, 500);
        } else {
          Logger.Message.Error("非管理员账号！");
        }
      },
      (res) => {
        Logger.Message.Error(res?.message || "请求错误！");
      }
    ).finally(() => {
      loading.ok = false;
    });
  }, [API.reqLogin, dispatch, fetchData, loading, loginInfo, router]);

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <img src="/icon.png" alt="logo" />
            <span>{AppSettings.APP_NAME}</span>
          </div>
          <form className="login-form">
            <Input
              suffix={<UserOutlined style={{ color: "#00000072" }} />}
              rootClassName={IsFocus.username ? "input-border active" : "input-border"}
              variant="borderless"
              value={loginInfo.username}
              placeholder="用户名"
              onChange={(e) => {
                loginInfo.username = e.target.value;
              }}
              size="large"
              onFocus={() => {
                IsFocus.username = true;
              }}
              onBlur={() => {
                IsFocus.username = false;
              }}
              autoComplete="username"
            />
            <Input.Password
              variant="borderless"
              rootClassName={IsFocus.password ? "input-border active" : "input-border"}
              placeholder="密码"
              value={loginInfo.password}
              onChange={(e) => {
                loginInfo.password = e.target.value;
              }}
              size="large"
              onFocus={() => {
                IsFocus.password = true;
              }}
              onBlur={() => {
                IsFocus.password = false;
              }}
              autoComplete="current-password"
            />
          </form>
          <div className="login-btn">
            <button
              className={loading.ok ?
                "btn btn-block sm:btn-sm lg:btn btn-loading" :
                "btn btn-block sm:btn-sm lg:btn"
              }
              onClick={submit}
            >
              {
                loading.ok && <span className="loading loading-spinner" />
              }
              {loading.ok || "登录"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
