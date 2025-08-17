type Company = {
  id: number;
  name: string;
  logo: string;
  adminName: string;
  tel: string;
  addr: string;
}
type CompanyList = {
  orgId?: number;
  buildings: CompanyBuilding[]
}
type CompanyBuilding = {
  id: number;
  name: string;
  pens: CompanyPen[]
}
type CompanyPen = {
  id: number;
  name: string;
}
