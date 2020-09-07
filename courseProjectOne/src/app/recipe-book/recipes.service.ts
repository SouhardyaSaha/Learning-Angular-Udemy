import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistsService } from '../shopping-list/shoppinglists.service';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe(
      'New Item',
      `it's just delicious`,
      'https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2020/04/2ambdxg.jpg',
      [
        new Ingredient('Pasta', 1),
        new Ingredient('Sause', 12)
      ]
    ),
    new Recipe(
      'Pasta',
      `it's just delicious`,
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.616.462.suffix/1537973085542.jpeg',
      [
        new Ingredient('Pasta', 1),
        new Ingredient('Sause', 12)
      ]
    ),
  ]

  newRecipesAdded = new Subject<Recipe[]>()

  constructor(private shoppinglistsService: ShoppinglistsService, private http: HttpClient) { }

  getRecipes() {
    return this.http
      .get<Recipe[]>('http://localhost:3000/recipes')

    // return this.recipes.slice()
  }

  getRecipe(id: string) {
    return this.http
      .get<Recipe>(`http://localhost:3000/recipes/${id}`)
  }

  addRecipe(recipe: Recipe) {

    this.http
      .post('http://localhost:3000/recipes', recipe)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )

    this.newRecipesAdded.next(this.recipes.slice())
  }

  updateRecipe(id: string, recipe: Recipe) {
    this.http
      .patch(`http://localhost:3000/recipes/${id}`, recipe)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
    // this.recipes[+index] = recipe
    // this.newRecipesAdded.next(this.recipes.slice())
  }

  deleteRecipe(id: string) {
    this.http
      .delete(`http://localhost:3000/recipes/${id}`)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      )
    // this.recipes.splice(index, 1)
    // this.newRecipesAdded.next(this.recipes.slice())
  }

  addMultipleToShoppingList(ingredients: Ingredient[]) {
    this.shoppinglistsService.addMultipletoList(ingredients)
  }

}
