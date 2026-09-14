import ProductDetailListComponent from "@/components/products/ProductDetailListComponent";

import type { Metadata } from 'next'
 
type Props = {
  params: Promise<{ id: string }>  // ✅ Correct: route params are strings
}

async function getProductById(id: string) {
  const numId = parseInt(id, 10);  // ✅ Convert string to number
  if (isNaN(numId)) return null;   // ✅ Validate conversion
  
  const res = await fetch(`${process.env.FAKESTORE_API}/products/${numId}`);
  if (!res.ok) return null;
  return res.json();
}
 
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;
 
  const product = await getProductById(id);
  
  if (!product) return { title: 'Product Not Found' };  // ✅ Handle null
 
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
  const { id } = await params;
  return (
    <div>
      <ProductDetailListComponent id={parseInt(id, 10)}/>  // ✅ Convert to number
    </div>
  )
}