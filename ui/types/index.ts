export type ActionData = {
  errors?: {
    bucketA?: string;
    bucketB?: string;
    amount?: string;
  };
};

export interface ResultData {
  [key: string]: string | number;
}
