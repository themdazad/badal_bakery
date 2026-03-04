// Client-side product store that merges base products with admin overrides from localStorage
import { PRODUCTS, type Product } from "./products";

const STORAGE_KEY = "badalbakery_admin_products";

export function getAdminProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAdminProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// Merge: base products overridden by admin edits, plus admin-added new products
export function getMergedProducts(): Product[] {
  const adminProducts = getAdminProducts();
  const adminMap = new Map(adminProducts.map((p) => [p.slug, p]));

  // Override base products with admin edits
  const merged = PRODUCTS.map((p) => adminMap.get(p.slug) ?? p);

  // Append brand-new admin products not in base list
  adminProducts.forEach((p) => {
    if (!PRODUCTS.find((b) => b.slug === p.slug)) {
      merged.push(p);
    }
  });

  return merged;
}

export function getMergedProductBySlug(slug: string): Product | undefined {
  return getMergedProducts().find((p) => p.slug === slug);
}

export function saveProductEdit(product: Product): void {
  const existing = getAdminProducts();
  const idx = existing.findIndex((p) => p.slug === product.slug);
  if (idx >= 0) {
    existing[idx] = product;
  } else {
    existing.push(product);
  }
  saveAdminProducts(existing);
}

export function deleteAdminProduct(slug: string): void {
  const existing = getAdminProducts().filter((p) => p.slug !== slug);
  saveAdminProducts(existing);
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
