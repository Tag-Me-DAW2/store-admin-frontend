export enum ProductMaterial {
    STEEL = 'STEEL',
    WOOD = 'WOOD',
    PVC = 'PVC',
    GOLDEN = 'GOLDEN'
}

export const ProductMaterialLabels: Record<ProductMaterial, string> = {
    [ProductMaterial.STEEL]: 'Steel',
    [ProductMaterial.WOOD]: 'Wood',
    [ProductMaterial.PVC]: 'PVC',
    [ProductMaterial.GOLDEN]: 'Golden'
};