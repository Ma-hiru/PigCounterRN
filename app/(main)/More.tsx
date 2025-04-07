import Manage from "@/components/more/Manage";
import Report from "@/components/more/Report";
import { userSelector } from "@/stores";
import { memo } from "react";
import { useSelector } from "react-redux";


const More = () => {
  const { profile } = useSelector(userSelector);

  return (
    <>
      {
        profile?.admin ? <Manage /> : <Report />
      }
    </>
  );
};
// noinspection JSUnusedGlobalSymbols
export default memo(More);
