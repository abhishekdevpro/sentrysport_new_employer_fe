

import BlogList from "@/components/blog-meu-pages/blog-list-v1";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Blog List V1 || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};
const BlogListpage1 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <BlogList />
    </>
  );
};

export default BlogListpage1
