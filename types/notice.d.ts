type Notice = {
  id: number;
  time: string;
  employeeId: number;
  companyId: number;
  type: "系统" | "组织";
  content: string;
  read: boolean;
  del: boolean;
}
