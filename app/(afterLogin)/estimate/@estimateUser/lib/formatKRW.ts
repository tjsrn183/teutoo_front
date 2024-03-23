export const formatKRW = (value: number) => {
  if (value) {
    return value.toLocaleString("ko-KR", {
      style: "currency",
      currency: "KRW",
    });
  }
};
