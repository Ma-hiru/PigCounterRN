import { ChangeEventHandler, FC, useCallback, useEffect } from "react";
import MyModal from "@/components/MyModal.tsx";
import { Avatar } from "antd";
import { useReactive } from "ahooks";
import { useFetchDataReact } from "@/hooks/useFetchData.ts";
import MyInput from "@/components/MyInput.tsx";
import { useDarkModeReact } from "@/hooks/useDarkMode.ts";
import Logger from "@/utils/logger.ts";
import "./CompanyInfoEditor.scss";

type props = {
  companyInfo: Company | null;
  type: "companyInfo" | "addCompanyBuilding" | "editCompanyBuilding" | "addCompanyPen" | "editCompanyPen";
  building: CompanyBuilding | null;
  pen: CompanyPen | null;
  onSave: () => void;
  open: boolean;
  onCancel: () => void;
};
const ModalTitle = (type: string) => {
  switch (type) {
    case "companyInfo":
      return "修改组织信息";
    case "addCompanyBuilding":
      return "增加楼栋";
    case "editCompanyBuilding":
      return "修改楼栋名称";
    case "addCompanyPen":
      return "增加栏舍";
    case "editCompanyPen":
      return "修改栏舍名称";
  }
  return "";
};
const CompanyInfoEditor: FC<props> = (
  {
    companyInfo,
    type,
    onSave,
    open,
    onCancel,
    building,
    pen
  }) => {
  const { fetchData, API } = useFetchDataReact();
  const [isDark] = useDarkModeReact();
  /** data */
  const NewCompanyInfo = useReactive<Company>({
    addr: "",
    adminName: "",
    id: 0,
    logo: "",
    name: "",
    tel: ""
  });
  const NewCompanyBuilding = useReactive<CompanyBuilding>({
    id: 0, name: "", pens: []
  });
  const NewBuildingPen = useReactive<CompanyPen>({ id: 0, name: "" });
  const AddInfo = useReactive({
    building: "",
    pen: ""
  });
  useEffect(() => {
    building && Object.keys(NewCompanyBuilding).forEach((key) => {
      //@ts-ignore
     NewCompanyBuilding[key] = building[key as keyof CompanyBuilding];
    });
    pen && Object.keys(NewBuildingPen).forEach((key) => {
      //@ts-ignore
     NewBuildingPen[key] = pen[key as keyof CompanyBuilding];
    });
    companyInfo && Object.keys(NewCompanyInfo).forEach((key) => {
      //@ts-ignore
      NewCompanyInfo[key] = companyInfo[key as keyof Company];
    });
  }, [NewBuildingPen, NewCompanyBuilding, NewCompanyInfo, building, companyInfo, pen]);
  const submit = useCallback(async () => {
    console.log("building", building);
    const Instance = Logger.Loading({
      lock: true,
      text: "处理中...",
      background: "rgba(0,0,0,0.7)"
    });
    switch (type) {
      case "companyInfo":
        //TODO edit company
        return Instance.close();
      case "addCompanyBuilding":
        if (companyInfo) await fetchData(
          API.reqAddBuilding,
          [AddInfo.building, companyInfo.id],
          () => {
            onSave();
          },
          (res) => {
            Logger.Message.Error(res?.message || "添加楼栋失败");
          }
        );
        return Instance.close();
      case "addCompanyPen":
        if (companyInfo && building) await fetchData(
          API.reqAddPen,
          [AddInfo.pen, building.id],
          () => {
            onSave();
          },
          (res) => {
            Logger.Message.Error(res?.message || "添加栏舍失败");
          }
        );
        return Instance.close();
      case "editCompanyBuilding":
        if (companyInfo && building) await fetchData(
          API.reqEditBuilding,
          [building.id, building.name, companyInfo.id],
          () => {
            onSave();
          },
          (res) => {
            Logger.Message.Error(res?.message || "修改楼栋失败");
          }
        );
        return Instance.close();
      case "editCompanyPen":
        if (companyInfo && pen && building) await fetchData(
          API.reqEditPen,
          [pen.id, pen.name, building.id],
          () => {
            onSave();
          },
          (res) => {
            Logger.Message.Error(res?.message || "修改栏舍失败");
          }
        );
        return Instance.close();
    }
  }, [API.reqAddBuilding, API.reqAddPen, API.reqEditBuilding, API.reqEditPen, AddInfo.building, AddInfo.pen, building, companyInfo, fetchData, onSave, pen, type]);
  const uploadFIle = useReactive({
    file: null as File | null,
    url: "" as string
  });
  const selectFile: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      if (uploadFIle.url) URL.revokeObjectURL(uploadFIle.url);
      const file = e.target.files[0];
      if (!file.type.startsWith("image/")) {
        return Logger.Message.Error("请选择图片文件");
      }
      const url = URL.createObjectURL(file);
      NewCompanyInfo.logo = url;
      uploadFIle.file = file;
      uploadFIle.url = url;
    }
  };
  return (
    <>
      <MyModal
        title={ModalTitle(type)}
        open={open}
        onOk={submit}
        onCancel={onCancel}
      >
        {
          type === "companyInfo" &&
          <div className="flex flex-col justify-center items-center space-y-3.5 pt-4 pb-4">
            <div className="relative mb-4" id={"company-editor-avatar-container"}>
              <Avatar
                src={NewCompanyInfo.logo}
                size={100}
              />
              <input
                type="file"
                className="opacity-0 absolute inset-0 z-10"
                onChange={selectFile}
              />
              <div
                id="company-editor-avatar-container-mask"
                className="absolute inset-0 flex justify-center items-center z-0 h-full w-full"
                style={{
                  background: isDark ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)",
                  color: isDark ? "#fff" : "#000"
                }}
              >
                <span>选择图片</span>
              </div>
            </div>
            <MyInput size={"large"} value={NewCompanyInfo.name} placeholder={"组织名"}
                     onChange={(e) => {
                       NewCompanyInfo.name = e.currentTarget.value.trim();
                     }}
            />
            <MyInput size={"large"} value={NewCompanyInfo.addr} placeholder={"地址"}
                     onChange={(e) => {
                       NewCompanyInfo.addr = e.currentTarget.value.trim();
                     }}
            />
            <MyInput size={"large"} value={NewCompanyInfo.tel} placeholder={"联系电话"}
                     onChange={(e) => {
                       NewCompanyInfo.tel = e.currentTarget.value.trim();
                     }}
            />
            <MyInput size={"large"} value={NewCompanyInfo.adminName} placeholder={"负责人"}
                     onChange={(e) => {
                       NewCompanyInfo.adminName = e.currentTarget.value.trim();
                     }}
            />
          </div>
        }
        {
          type === "addCompanyBuilding" &&
          <div>
            <MyInput value={AddInfo.building} onChange={(e) => {
              AddInfo.building = e.currentTarget.value.trim();
            }} placeholder={"楼栋名"} />
          </div>
        }
        {
          type === "editCompanyBuilding" &&
          <div>
            <MyInput
              value={NewCompanyBuilding.name}
              onChange={(e) => {
                NewCompanyBuilding.name = e.currentTarget.value;
              }}
            />
          </div>
        }
        {
          type === "addCompanyPen" &&
          <div>
            <MyInput value={AddInfo.pen} onChange={(e) => {
              AddInfo.pen = e.currentTarget.value.trim();
            }} placeholder={"栏舍名"} />
          </div>
        }
        {
          type === "editCompanyPen" &&
          <div>
            <MyInput
              value={NewBuildingPen.name}
              onChange={(e) => {
                NewBuildingPen.name = e.currentTarget.value.trim();
              }}
            />
          </div>
        }
      </MyModal>
    </>
  );
};
export default CompanyInfoEditor;
