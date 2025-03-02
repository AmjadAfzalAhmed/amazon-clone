'use client'

import { useState } from "react";
import Title from "./Title";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";

interface Props {
    categories: string[];
    setSelectedCategory: (category: string) => void;
    setPriceFilter: (value: string) => void;
    selectedCategory: string;
    priceFilter: string;
    setPriceValue: (value: number) => void;
    priceValue: number;
    defaultPrice: number;
    maxPrice: number;
}

const ProductFilters = ({ categories, selectedCategory, setSelectedCategory,
    priceFilter, setPriceFilter, priceValue,
    setPriceValue, defaultPrice, maxPrice }: Props) => {
    const [categoriesArray, setCategoriesArray] = useState(categories.slice(0, 8));

    return (
        <div className="space-y-4">
            <Title className="text-lg font-semibold mb-4">Filters</Title>
            <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Category</h4>
                <div className="space-y-2">
                    {categoriesArray.map((item) => (
                        <div key={item} className="flex items-center gap-2 cursor-pointer">
                            <Checkbox id={`category-${item}`} checked={selectedCategory === item} onCheckedChange={() => setSelectedCategory(item)} />
                            <Label htmlFor={`category-${item}`} className="ml-2 capitalizecursor-pointer">{item}</Label>
                        </div>
                    ))}
                    {categoriesArray?.length > 8 ?
                        <button className="text-xs font-semibold text-amazonBlue underline underline-offset-2 hover:text-amazonOrangeDark hoverEffect" onClick={() => setCategoriesArray(categories.slice(0, 8))}>Minimize</button>
                        : <button className="text-xs font-semibold text-amazonBlue underline underline-offset-2 hover:text-amazonOrangeDark hoverEffect" onClick={() => setCategoriesArray(categories)}>Show All Categories</button>}
                </div>
            </div>
            <div className="mt-5">
                <h4 className="text-sm font-semibold mb-2">Price Range</h4>
                <div className='space-y-2'>
                    {[
                        { value: "desc", title: "High to Low" },
                        { value: "asc", title: "Low to High" },
                    ].map((item) => (
                        <div key={item?.title} className="flex items-center cursor-pointer mb-2">
                            <Checkbox id={`price-${item?.value}`} checked={item?.value === priceFilter} onCheckedChange={() => setPriceFilter(item?.value)} />
                            <Label htmlFor={`price-${item?.value}`} className="ml-2 capitalize cursor-pointer">{item?.title}</Label>
                        </div>
                    ))}
                    <div className="mt-5">
                        <Slider
                            defaultValue={[defaultPrice]}
                            max={maxPrice}
                            step={1}
                            value={[priceValue]}
                            onValueChange={(value) => setPriceValue(value[0])}
                            className="cursor-pointer"
                        />
                        {priceValue > 0 && (<p className="mt-3 text-ss font-semibold">Filter Price: <span className='font-bold'>{defaultPrice}</span>to{""}
                            <span className="font-bold">{priceValue}</span></p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductFilters
