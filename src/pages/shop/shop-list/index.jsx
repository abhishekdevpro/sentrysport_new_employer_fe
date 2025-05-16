
import ShopList from "@/components/shop/shop-list";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Shop List || Sentryspot - Job Borad ReactJs Template",
  description: "Sentryspot - Job Borad ReactJs Template",
};

const ShopListPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <ShopList />
    </>
  );
};

export default ShopListPage
