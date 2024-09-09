
import OrderCompleted from "@/components/shop/order-completed";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Order Completed || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const OrderCompletedPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <OrderCompleted />
    </>
  );
};

export default OrderCompletedPage
