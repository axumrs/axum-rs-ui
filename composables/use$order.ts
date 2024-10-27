export default function use$order() {
  const $status = (status: string) => {
    switch (status) {
      case "Pending":
        return "待支付";
      case "Finished":
        return "已完成";
      case "Cancelled":
        return "已取消";
      case "Closed":
        return "已关闭";
    }
    return status;
  };

  return { $status };
}
