
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
    const numId = parseInt(id, 10);
    
    if (isNaN(numId)) {
      return { 
        title: 'Product',
        description: 'Product details'
      };
    }

    // Fetch product data with timeout to prevent hanging during build
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
    
    try {
      const res = await fetch(`https://fakestoreapi.com/products/${numId}`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const product = await res.json();
        
        if (product && product.title) {
          return {
            title: product.title,
            description: product.description || 'Discover this product',
            openGraph: {
              title: product.title,
              description: product.description || 'Discover this product',
              images: product.image ? [product.image] : [],
            },
          }
        }
      }
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error('[Metadata] Fetch error:', fetchError);
    }

    // Generic fallback - better than "Product Not Found"
    return { 
      title: 'Product',
      description: 'Discover our products'
    };
  } catch (error) {
    console.error('[Metadata] Error in generateMetadata:', error);
    return { 
      title: 'Product',
      description: 'Discover our products'
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
