
import ProductDetailListComponent from "@/components/products/ProductDetailListComponent";

import type { Metadata } from 'next'
 
type Props = {
  params: Promise<{ id: string }>
}

async function getProductById(id: string) {
  const numId = parseInt(id, 10);
  if (isNaN(numId)) return null;
  
  // Hardcoded URL - env vars not available during build time
  const res = await fetch(`https://fakestoreapi.com/products/${numId}`);
  if (!res.ok) return null;
  return res.json();
}
 
// dynamic metadata & opengraph 
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  try {
    // read route params
    const { id } = await params;
    console.log('[Metadata] Fetching product for ID:', id);
 
    // fetch data
    const product = await getProductById(id);
    console.log('[Metadata] Product fetched:', product?.title || 'null');

    if (!product) {
      console.log('[Metadata] Product not found, returning fallback');
      return { 
        title: 'Product Not Found',
        description: 'The product you are looking for does not exist.'
      };
    }
 
    console.log('[Metadata] Returning product metadata:', product.title);
    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    }
  } catch (error) {
    console.error('[Metadata] Error fetching product:', error);
    // Fallback metadata if fetch fails
    return { 
      title: 'Product Details',
      description: 'View product details'
    };
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
