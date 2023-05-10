import React, {useEffect, useState} from 'react'
import axios from "axios"
import Card from '../UI/Card';
import MealItem from './MealItem';
import classes from './AvailableMeals.module.css'


const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Paratha',
      description: 'Layered and pan-fried',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Vada Pav',
      description: 'Deep-fried fritters',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Chana (Chole) Masala',
      description: 'Popular North Indian curry',
      price: 50,
    },
    {
      id: 'm4',
      name: 'Samosa',
      description: 'Popular street food',
      price: 15,
    },
  ];


function AvailableMeals() {


    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {DUMMY_MEALS.map((meal) => <MealItem id={meal.id} key={meal.id} name={meal.name} price={meal.price}
                        description={meal.description} />)}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
