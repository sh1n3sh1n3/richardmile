// ----------------------------------------------------------------------

export type FilterOption = {
    label: string;
    value: string;
  };
  
  export type FilterCategory = {
    name: string;
    options: FilterOption[];
  };
  
  export type CollectionsFilterProps = {
    categories?: string[];
    selectedCategory?: string;
    onCategoryChange?: (category: string) => void;
  };
  