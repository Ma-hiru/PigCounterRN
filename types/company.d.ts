type CompanyProfile = {
  id: number;
  name: string;
  logo: string;
  adminName: string;
  tel: string;
  addr: string;
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
