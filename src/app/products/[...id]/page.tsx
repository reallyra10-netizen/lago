
import ProductDetailListComponent from "@/components/products/ProductDetailListComponent";
import { error } from "console";

import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: Promise<{ id: number }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getProductById(id: number) {
  const res = await fetch(`${process.env.FAKESTORE_API}/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}
 
// dynamic metadata & opengraph 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { id } = await params;
 
  // fetch data
  const product = await getProductById(id);

 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [`${product.image}`, ...previousImages],
    },
  }
}
 
export default async function DetailProductPage(
  { params, searchParams }: Props
  ) {
  const {id} = await params;
  return (
    <div>
      {/* Product ID = {id} */}
       <ProductDetailListComponent id={id}/>
    </div>
  )
}
