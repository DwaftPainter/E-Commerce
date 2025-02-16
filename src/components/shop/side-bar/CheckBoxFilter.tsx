'use client'

import React from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { FormGroup, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import {  Minus, Plus } from 'lucide-react'

type CategoryType = {
    id: number
    name: string
    items: CategoryItemType[]
}

type CategoryItemType = {
     id: number; name: string
}

type BrandType = {
    name: string
    productCount: number
}

interface CategoryProps {
    categories: CategoryType[]
    checked: Record<string, boolean>
    setChecked: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
}

interface BrandProps {
    brands: BrandType[]
    brandChecked: Record<string, boolean>
    setBrandChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

interface StatusProps {
    statuses: string[]
    statusChecked: Record<string, boolean>
    setStatusChecked: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

export const CategoryCheckBoxFilter = ({ categories, checked, setChecked }: CategoryProps) => {
    const [expanded, setExpanded] = React.useState<Record<number, boolean>>({})

    const handleCategoryChange = (category: CategoryType) => {
        setChecked(prev => {
            if (!(category.items.length > 0))
                return {
                    ...prev,
                    [category.id]: !prev[category.id] // Store numeric ID
                }

            const allChecked = category?.items.every(item => prev[item.id])
            let updatedCheck = { ...prev }

            category?.items.forEach(item => {
                updatedCheck[item.id] = !allChecked
            })

            updatedCheck[category.id] = !allChecked // Store parent numeric ID

            return updatedCheck
        })
    }

    const handleItemChange = (item: CategoryItemType) => {
        setChecked(prev => {
            const updatedCheck: Record<number, boolean> = { ...prev, [item.id]: !prev[item.id] }

            // Check if all child items are checked, then check parent
            const parentCategory = categories.find(cat => cat.items.some(subItem => subItem.id === item.id))
            if (parentCategory) {
                updatedCheck[parentCategory.id] = parentCategory.items.every(subItem => updatedCheck[subItem.id])
            }

            return updatedCheck
        })
    }

    const toggleCategories = (categoryId: number) => {
        setExpanded(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }))
    }

    return (
        <FormGroup>
            {categories?.map((category, index) => (
                <div key={index}>
                    <div className='flex items-center justify-between'>
                        <FormControlLabel
                            sx={{
                                '.MuiFormControlLabel-label': {
                                    fontSize: '13px',
                                    color: `${
                                        (!!checked[category.id] && '#DB4444') ||
                                        (category?.items.length > 0 &&
                                            category?.items.every(item => checked[item.id]) &&
                                            '#DB4444')
                                    }`
                                }
                            }}
                            label={category?.name}
                            control={
                                <Checkbox
                                    size='small'
                                    checked={
                                        !!checked[category.id] ||
                                        (category?.items.length > 0 &&
                                            category?.items.every(item => checked[item.id]))
                                    }
                                    onChange={() => handleCategoryChange(category)}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#DB4444'
                                        }
                                    }}
                                />
                            }
                        />
                        {category?.items && category?.items.length > 0 && (
                            <IconButton onClick={() => toggleCategories(category.id)}>
                                {expanded[category.id] ? (
                                    <Minus size={12} strokeWidth={3} />
                                ) : (
                                    <Plus size={12} strokeWidth={3} />
                                )}
                            </IconButton>
                        )}
                    </div>
                    <motion.div
                        initial={false}
                        animate={{
                            height: expanded[category.id] ? 'auto' : 0,
                            opacity: expanded[category.id] ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='ml-6 flex flex-col overflow-hidden'
                    >
                        {category?.items &&
                            category?.items.map(item => (
                                <FormControlLabel
                                    key={item.id}
                                    sx={{
                                        '.MuiFormControlLabel-label': {
                                            fontSize: '13px',
                                            color: `${checked[item.id] && '#DB4444'}`
                                        }
                                    }}
                                    label={item.name}
                                    control={
                                        <Checkbox
                                            checked={!!checked[item.id]}
                                            onChange={() => handleItemChange(item)}
                                            size='small'
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#DB4444'
                                                }
                                            }}
                                        />
                                    }
                                />
                            ))}
                    </motion.div>
                </div>
            ))}
        </FormGroup>
    )
}


export const StatusCheckBoxFilter = ({ statuses, statusChecked, setStatusChecked }: StatusProps) => {
    const handleItemChange = (item: string) => {
        setStatusChecked(prev => ({
            ...prev,
            [item]: !prev[item]
        }))
    }

    return (
        <FormGroup>
            {statuses?.map((status, index) => (
                <div key={index}>
                    <div className='flex items-center justify-between'>
                        <FormControlLabel
                            sx={{
                                '.MuiFormControlLabel-label': {
                                    fontSize: '13px',
                                    color: `${!!statusChecked[status.toLocaleLowerCase().split(' ').join('')] && '#DB4444'}`
                                }
                            }}
                            label={status}
                            control={
                                <Checkbox
                                    size='small'
                                    checked={!!statusChecked[status.toLocaleLowerCase().split(' ').join('')]}
                                    onChange={() => handleItemChange(status.toLocaleLowerCase().split(' ').join(''))}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#DB4444'
                                        }
                                    }}
                                />
                            }
                        />
                    </div>
                </div>
            ))}
        </FormGroup>
    )
}

export const BrandCheckBoxFilter = ({ brands, brandChecked, setBrandChecked }: BrandProps) => {
    const handleItemChange = (item: string) => {
        setBrandChecked(prev => ({
            ...prev,
            [item]: !prev[item]
        }))
    }

    return (
        <FormGroup>
            {brands?.map((brand, index) => (
                <div key={index}>
                    <div className='flex items-center justify-between'>
                        <FormControlLabel
                            sx={{
                                '.MuiFormControlLabel-label': {
                                    fontSize: '13px',
                                    color: `${!!brandChecked[brand.name.toLocaleLowerCase().split(' ').join('')] && '#DB4444'}`
                                }
                            }}
                            label={brand.name}
                            control={
                                <Checkbox
                                    size='small'
                                    checked={!!brandChecked[brand.name.toLocaleLowerCase().split(' ').join('')]}
                                    onChange={() => handleItemChange(brand.name.toLocaleLowerCase().split(' ').join(''))}
                                    sx={{
                                        '&.Mui-checked': {
                                            color: '#DB4444'
                                        }
                                    }}
                                />
                            }
                        />
                        <p className='text-[13px] font-semibold'>({brand.productCount})</p>
                    </div>
                </div>
            ))}
        </FormGroup>
    )
}

// import React, { useState } from "react";
// import { FormGroup, FormControlLabel, Checkbox, IconButton } from "@mui/material";
// import { ExpandMore, ExpandLess } from "@mui/icons-material";
// import { motion } from "framer-motion";

// interface Category {
//   name: string;
//   items: string[];
// }

// const categories: Category[] = [
//   { name: "Electronics", items: ["Laptop", "Smartphone", "Headphones", "Smartwatch"] },
//   { name: "Clothing", items: ["T-shirt", "Jeans", "Jacket", "Sneakers"] },
//   { name: "Home & Kitchen", items: ["Blender", "Coffee Maker", "Microwave", "Toaster"] },
//   { name: "Books", items: ["Fiction", "Non-fiction", "Science", "History"] },
//   { name: "Sports & Outdoors", items: ["Bicycle", "Tennis Racket", "Yoga Mat", "Camping Tent"] },
// ];

// const CategoryCheckboxes: React.FC = () => {
//   const [checked, setChecked] = useState<Record<string, boolean>>({});
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   const handleCategoryChange = (category: Category) => {
//     setChecked((prev) => {
//       const allChecked = category?.items.every((item) => prev[item]);
//       const updatedState = { ...prev };

//       category?.items.forEach((item) => {
//         updatedState[item] = !allChecked;
//       });

//       return updatedState;
//     });
//   };

//   const handleItemChange = (item: string) => {
//     setChecked((prev) => ({
//       ...prev,
//       [item]: !prev[item],
//     }));
//   };

//   const toggleExpand = (categoryName: string) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [categoryName]: !prev[categoryName],
//     }));
//   };

//   return (
//     <FormGroup>
//       {categories.map((category) => (
//         <div key={category.name}>
//           {/* Parent Checkbox with Toggle Button */}
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <FormControlLabel
//               sx={{ flexGrow: 1, ".MuiFormControlLabel-label": { fontSize: "18px", fontWeight: "bold" } }}
//               label={category.name}
//               control={
//                 <Checkbox
//                   checked={category?.items.every((item) => checked[item])}
//                   indeterminate={
//                     category?.items.some((item) => checked[item]) &&
//                     !category?.items.every((item) => checked[item])
//                   }
//                   onChange={() => handleCategoryChange(category)}
//                 />
//               }
//             />
//             <IconButton onClick={() => toggleExpand(category.name)}>
//               {expanded[category.name] ? <ExpandLess /> : <ExpandMore />}
//             </IconButton>
//           </div>

//           {/* Child Checkboxes with Framer Motion */}
//           <motion.div
//             initial={false}
//             animate={{ height: expanded[category.name] ? "auto" : 0, opacity: expanded[category.name] ? 1 : 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             style={{ overflow: "hidden", marginLeft: "24px" }}
//           >
//             {category?.items.map((item) => (
//               <FormControlLabel
//                 key={item}
//                 sx={{ ".MuiFormControlLabel-label": { fontSize: "16px" } }}
//                 label={item}
//                 control={
//                   <Checkbox checked={!!checked[item]} onChange={() => handleItemChange(item)} />
//                 }
//               />
//             ))}
//           </motion.div>
//         </div>
//       ))}
//     </FormGroup>
//   );
// };

// export default CategoryCheckboxes;
