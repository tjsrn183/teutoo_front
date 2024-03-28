export interface getEstimates {
  pageParams: Array<number>;
  pages: Array<EstimateItem>;
}
export interface EstimateItem {
  data: Array<EstimateItemAtom>;
  myEstimateId: number | null;
}
export interface EstimateItemAtom {
  estimateId: number;
  name: string;
  price: number;
  profileImagePath: string;
  memberId: number;
}
