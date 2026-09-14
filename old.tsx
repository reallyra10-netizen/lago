import ProductDetailListComponent from "@/components/products/ProductDetailListComponent";
import { error } from "console";

import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: Promise<{ id: number }>  // ❌ WRONG: id is string, not number
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function getProductById(id: number) {
  const res = await fetch(`${process.env.FAKESTORE_API}/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
 
  const product = await getProductById(id);  // ❌ Passing string as number
 
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product.title,  // ❌ Crashes if product is null
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
      <ProductDetailListComponent id={id}/>  // ❌ Passing string instead of number
    </div>
  )
}