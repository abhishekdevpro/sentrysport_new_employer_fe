

import BlogList from "@/components/blog-meu-pages/blog-list-v2";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: 'Blog List V2 || Sentryspot - Job Borad ReactJs Template',
  description:
    'Sentryspot - Job Borad ReactJs Template',
  
}



const BlogListpage2 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />

      <BlogList />
    </>
  );
};

export default BlogListpage2