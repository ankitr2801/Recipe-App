// const saerchBox  = document.querySelector('.searchBox')
// const searchBtn  = document.getElementById('searchBtn')
// const recipecontainer = document.querySelector('.recipe-container')
// const recipedetails = document.querySelector('.recipe-details')
// const recipeDetailscontent = document.querySelector('.recipe-Details-content')
// const closePopUpbutton = document.querySelector('.close-PopUp-button')

// const fetchRecipesData = async (query) => {
//       recipecontainer.innerHTML = "Fetching Recipes Data...";

//       try {
//           const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);

//           if (!response.ok) {
//               throw new Error(`Failed to fetch data: ${response.status}`);
//           }

//           const data = await response.json();

//           if (data.meals) {
//               recipecontainer.innerHTML = '';

//               data.meals.forEach(meal => {
//                   // Create recipe cards
//                   const recipeDiv = document.createElement('div');
//                   recipeDiv.classList.add('recipe');
//                   recipeDiv.innerHTML = `
//                       <img src="${meal.strMealThumb}">
//                       <h3>${meal.strMeal}</h3>
//                       <p><span>${meal.strArea}</span> Dish</p>
//                       <p>Belongs to <span>${meal.strCategory}</span> Category</p>
//                   `;
//                   recipecontainer.appendChild(recipeDiv);

//                   // Create a button for view recipe
//                   const button = document.createElement('button');
//                   button.textContent = "View Recipes";
//                   recipeDiv.appendChild(button);

//                   button.addEventListener('click', (e) => {
//                       e.preventDefault();
//                       openMealRecipeDetails(meal);
//                   });
//               });
//           } else {
//               recipecontainer.innerHTML = `<h2>No results found</h2>`;
//           }
//       } catch (error) {
//           console.error("Error fetching data:", error.message);
//           recipecontainer.innerHTML = `<h2>Error fetching data. Please try again later.</h2>`;
//       }
//   };

// const fetchIngredients = (meal) => {
//       let ingredientsList = "";
//       for (let i = 1; i <= 20; i++){
//             const ingredient = meal[`strIngredient${i}`];
//             console.log(ingredient);

//             if (ingredient) {
//                   const measure = meal[`strMeasure${i}`]
//                   ingredientsList += `<li>${measure} ${ingredient}</li>`
//             } else {
//                   break;
//             }

//       }
//       return ingredientsList;

// }

// const openMealRecipeDetails = (meal) => {
//       console.log(meal);
//       recipeDetailscontent.innerHTML = `
//       <h2 class="recepeName"> ${meal.strMeal}</h2>
//       <p class="ingredients">Ingredients : </p>
//       <ul> ${fetchIngredients(meal)} class="recepeIngredients" </ul>
//       <div class="recipeInstructions">
//       <p  class="instruction "> Instruction :</p>
//       <p>${meal.strInstructions}</p>
// </div>

//       `
//       recipeDetailscontent.parentElement.style.display = "block"

// }

// closePopUpbutton.addEventListener('click', () => {
//       recipeDetailscontent.parentElement.style.display = "none"
// })

// searchBtn.addEventListener('click', (e) => {

//       e.preventDefault();
//       const inputText = saerchBox.value.trim();
//       if (!inputText) {
//             recipecontainer.innerHTML = `<h2> Type Your Meal In Search Box...</h2>`
//             return;
//       }
//       fetchRecipesData(inputText);
// })

// saerchBox.addEventListener('keypress', (e) => {
//       if (e.key === 'Enter') {
//           e.preventDefault();
//           const inputText = saerchBox.value.trim();
//           if (!inputText) {
//               recipecontainer.innerHTML = `<h2>Type Your Meal In Search Box...</h2>`;
//               return;
//           }
//           fetchRecipesData(inputText);
//       }
//   })
const saerchBox = document.querySelector(".searchBox");
const searchBtn = document.getElementById("searchBtn");
const categoryFilter = document.getElementById("categoryFilter");
const recipecontainer = document.querySelector(".recipe-container");
const recipedetails = document.querySelector(".recipe-details");
const recipeDetailscontent = document.querySelector(".recipe-Details-content");
const closePopUpbutton = document.querySelector(".close-PopUp-button");
const categoryOptionsArray = [];

// Function to fetch categories and populate the dropdown menu
const fetchCategories = async () => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );
  const data = await response.json();
  console.log(data);

  const categoryOptions = data.meals.map(
    (category) =>
      `<option value="${category.strCategory}">${category.strCategory}</option>`
    );
    console.log(categoryOptions);
    categoryFilter.innerHTML = categoryFilter.innerHTML + categoryOptions;
};

// Fetch categories when the page loads
fetchCategories();

const fetchRecipesData = async (query, category = "") => {
  recipecontainer.innerHTML = "Fetching Recipes Data...";

  try {
    const categoryParam = category ? `&c=${category}` : "";
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}${categoryParam}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();

    if (data.meals) {
      recipecontainer.innerHTML = "";

      data.meals.forEach((meal) => {
        // Create recipe cards
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea}</span> Dish</p>
                    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
                `;
        recipecontainer.appendChild(recipeDiv);

        // Create a button for view recipe
        const button = document.createElement("button");
        button.textContent = "View Recipes";
        recipeDiv.appendChild(button);

        button.addEventListener("click", (e) => {
          e.preventDefault();
          openMealRecipeDetails(meal);
        });
      });
    } else {
      recipecontainer.innerHTML = `<h2>No results found</h2>`;
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    recipecontainer.innerHTML = `<h2>Error fetching data. Please try again later.</h2>`;
  }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputText = saerchBox.value.trim();
  if (!inputText) {
    recipeDetailscontent.innerHTML = `<h2>Type your Meal In Search Box...</h2>`;
  }
  fetchRecipesData(inputText);
});

// Event listener for the category filter dropdown
categoryFilter.addEventListener("change", () => {
    const selectedCategory = categoryFilter.value;
    // console.log(selectedCategory);
  const inputText = saerchBox.value.trim();
  fetchRecipesData(inputText, selectedCategory);
});

// Rest of your code...
