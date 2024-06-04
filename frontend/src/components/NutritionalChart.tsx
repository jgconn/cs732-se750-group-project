import { Recipe } from '@/types/interfaces';
import { ResponsivePie } from '@nivo/pie';
import { useMemo } from 'react';


interface NutritionalChartProps {
    recipe: Recipe
}

export const NutritionalChart = ({recipe}: NutritionalChartProps) => {
    const nutritionValues = useMemo(() => {
            const values: any = { protein: 0, totalCarbohydrate: 0, totalFat: 0, Other: 0 };
            let totalGrams = 0;
      
            recipe.estimatedNutrition.forEach(nutrient => {
              const [key, value] = nutrient.split(':');
              if (key === 'calories') {
                return;
              }
              const unit = value.match(/[a-zA-Z]+/) ? value.match(/[a-zA-Z]+/)![0] : 'g';
              const numericValue = parseFloat(value);
      
              // Convert all units to grams
              let convertedValue = numericValue;
              if (unit === 'mg') {
                convertedValue /= 1000; // 1 gram = 1000 milligrams
              } else if (unit === 'kg') {
                convertedValue *= 1000; // 1 kilogram = 1000 grams
              }
      
              if (key === "protein" || key === "totalCarbohydrate" || key === "totalFat") {
                values[key] += convertedValue;
                totalGrams += convertedValue;
              } else if ((key as string) !== "saturatedFat" || (key as string) !== "transFat") {
                values.Other += convertedValue;
                totalGrams += convertedValue;
              }
            });
      
            // Calculate percentage for each property
            for (const key in values) {
              values[key] = ((values[key] / totalGrams) * 100).toFixed(2);
            }
      
            // Pushing the data into the array with id, label, value, and color
            return [
                { id: 'Protein',  value: values.protein, color: '#00C2FF' },
                { id: 'Carbohydrates', value: values.totalCarbohydrate, color: '#FFB800' },
                { id: 'Fat', value: values.totalFat, color: '#FF6B00' },
                { id: 'Other', value: values.Other, color: 'hsl(348, 70%, 50%)' }
            ];

          }, [recipe.estimatedNutrition, recipe.recipeName]);
    
    return (
    <ResponsivePie
        data={nutritionValues}
        margin={{ top: 0, right: 100, bottom: 0, left: 0 }}
        innerRadius={0.6}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        valueFormat={value => `${value}g`}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        colors={{ datum: 'data.color' }}
        enableArcLinkLabels={false}
        enableArcLabels={false}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 5,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#000000',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    )
}