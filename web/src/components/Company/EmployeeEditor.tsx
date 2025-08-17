import { ChangeEventHandler, FC, useEffect } from "react";
import MyModal from "@/components/MyModal.tsx";
import { useReactive } from "ahooks";
import { Avatar } from "antd";
import Logger from "@/utils/logger.ts";
import "./EmployeeEditor.scss";
import defaultAvatar from "/public/defaultAvatr.svg";
import defaultAvatarWhite from "/public/defaultAvatr_white.svg";
import { useDarkModeReact } from "@/hooks/useDarkMode.ts";
import MyInput from "@/components/MyInput.tsx";
import { useFetchDataReact } from "@/hooks/useFetchData.ts";
import { handleServerURL } from "@/utils/handleServerURL.ts";

type props = {
  open: boolean;
  employee: EmployeeInfo | null;
  orgId: number;
  orgName: string;
  close: () => void;
  type: "add" | "edit";
};

const EmployeeEditor: FC<props> = ({ open, employee, close, type, orgId, orgName }) => {
  const [isDark] = useDarkModeReact();
  const newEmployee = useReactive<EmployeeInfo>({
    createTime: "",
    id: 0,
    name: "",
    organization: "",
    phone: "",
    profilePicture: "",
    sex: "",
    username: "",
    ...employee
  });
  const newPassword = useReactive({ password: "" });
  const uploadFIle = useReactive({
    file: null as File | null,
    url: "" as string
  });
  useEffect(() => {
    if (employee && employee.id !== newEmployee.id && employee.name !== newEmployee.name) {
      for (const key of Object.keys(employee)) {
        (newEmployee[key as keyof EmployeeInfo] as string | number) = employee[key as keyof EmployeeInfo];
      }
    }
  }, [employee, newEmployee]);
  const { fetchData, API } = useFetchDataReact();
  const submit = async () => {
    close();
    switch (type) {
      case "add":
        if (!uploadFIle.file) return Logger.Message.Info("请选择图片");
        await fetchData(
          API.reqAddEmployee,
          [{
            username: newEmployee.username,
            password: newPassword.password,
            phone: newEmployee.phone,
            orgId,
            admin: false,
            sex: newEmployee.sex,
            name: newEmployee.name,
            organization: orgName,
            picture: uploadFIle.file
          }],
          () => {
            close();
          },
          (res) => {
            Logger.Message.Error(res?.message || "添加失败");
          }
        );
        return;
      case "edit":
        Logger.Console({
          id: newEmployee.id,
          username: newEmployee.username,
          phone: newEmployee.phone,
          orgId,
          admin: false,
          sex: newEmployee.sex,
          name: newEmployee.name,
          //TODO
          organization: orgName,
          picture: uploadFIle.file!
        })
        await fetchData(
          API.reqEditEmployee,
          [{
            id: newEmployee.id,
            username: newEmployee.username,
            phone: newEmployee.phone,
            orgId,
            admin: false,
            sex: newEmployee.sex,
            name: newEmployee.name,
            //TODO
            organization: orgName,
            picture: uploadFIle.file!
          }],
          () => {
            close();
          },
          (res) => {
            Logger.Message.Error(res?.message || "编辑失败");
          }
        );
    }
  };
  const selectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      if (uploadFIle.url) URL.revokeObjectURL(uploadFIle.url);
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        return Logger.Message.Error("请选择图片文件");
      }
      const url = URL.createObjectURL(file);
      newEmployee.profilePicture = url;
      uploadFIle.file = file;
      uploadFIle.url = url;
    }
  };
  return (
    <>
      <MyModal
        title={type === "add" ? "增加员工" : "编辑员工"}
        open={open}
        onCancel={close}
        onOk={submit}
      >
        <div className="flex flex-col justify-center items-center space-y-4 p-4 pt-6">
          <div className="relative" id={"employee-editor-avatar-container"}>
            <Avatar
              src={handleServerURL(newEmployee.profilePicture,"avatar") || (isDark ? defaultAvatarWhite : defaultAvatar)}
              size={100}
            />
            <input
              type="file"
              className="opacity-0 absolute inset-0 z-10"
              onChange={selectFile}
            />
            <div
              id="employee-editor-avatar-container-mask"
              className="absolute inset-0 flex justify-center items-center z-0 h-full w-full"
              style={{
                background: isDark ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                color: isDark ? "#fff" : "#000"
              }}
            >
              <span>选择图片</span>
            </div>
          </div>
          <MyInput
            placeholder={"姓名"}
            value={newEmployee.name}
            size={"large"}
            onChange={(e) => {
              newEmployee.name = e.currentTarget.value.trim();
            }}
          />
          <MyInput
            placeholder={"用户名"}
            value={newEmployee.username}
            size={"large"}
            onChange={(e) => {
              newEmployee.username = e.currentTarget.value.trim();
            }}
          />
          {
            type === "add" &&
            <MyInput placeholder={"密码"} size={"large"} value={newPassword.password}
                     onChange={(e) => {
                       newPassword.password = e.currentTarget.value.trim();
                     }} />
          }
          <MyInput
            placeholder={"手机号"}
            value={newEmployee.phone}
            size={"large"}
            onChange={(e) => {
              newEmployee.phone = e.currentTarget.value.trim();
            }} />
          <MyInput
            placeholder={"性别"}
            value={newEmployee.sex}
            size={"large"}
            onChange={(e) => {
              newEmployee.sex = e.currentTarget.value.trim();
            }}
          />
        </div>
      </MyModal>
    </>
  );
};
export default EmployeeEditor;
