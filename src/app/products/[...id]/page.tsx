
import ProductDetailListComponent from "@/components/products/ProductDetailListComponent";

import type { Metadata } from 'next'
 
type Props = {
  params: Promise<{ id: string }>
}

async function getProductById(id: string) {
  const numId = parseInt(id, 10);
  if (isNaN(numId)) return null;
  
  const res = await fetch(`${process.env.FAKESTORE_API}/products/${numId}`);
  if (!res.ok) return null;
  return res.json();
}
 
// dynamic metadata & opengraph 
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  // read route params
  const { id } = await params;
 
  // fetch data
  const product = await getProductById(id);

  if (!product) return { title: 'Product Not Found' };
 
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  }
}
 
export default async function DetailProductPage(
  { params }: Props
  ) {
  const {id} = await params;
  return (
    <div>
      <ProductDetailListComponent id={parseInt(id, 10)}/>
    </div>
  )
}
