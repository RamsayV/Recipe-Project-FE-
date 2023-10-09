import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../components/Project/HomePage'
import AddRecipe from '../components/Project/AddRecipe'
import AllContributors from '../components/Project/AllContributors'
import EditRecipe from '../components/Project/EditRecipe'
import SingleRecipe from '../components/Project/SingleRecipe'
import SingleContributor from '../components/Project/SingleContributor'
import AllRecipes from '../components/Project/AllRecipes'
import NavVue from '../components/Project/NavVue.vue'
import RecipeApi from '../components/Project/RecipeApi'
import LoginForm from '../components/auth/Login'

const routes = [

{
    name: 'HomePage',
    path: '/',
    component: HomePage
},
{
    name: 'AddRecipe',
    path: '/AddRecipe',
    component: AddRecipe
},
{
    name: 'AllContributors',
    path: '/AllContributors',
    component: AllContributors
},
{
    name: 'EditRecipe',
    path: '/recipe/edit/:id',
    component: EditRecipe
},
{
    name: 'SingleRecipe',
    path: '/AllRecipes/:id',
    component: SingleRecipe
},
{
    name: 'SingleContributor',
    path: '/AllContributors/:id',
    component: SingleContributor
},
{
    name: 'AllRecipes',
    path: '/AllRecipes',
    component: AllRecipes
},
{
    name: 'NavVue',
    path: '/NavVue.vue',
    component: NavVue
},
{
    name: 'LoginForm',
    path: '/login',
    component: LoginForm
},
{
    name: 'RecipeApi',
    path: '/RecipeCreator',
    component: RecipeApi
},

]

const router = createRouter({
history: createWebHistory(),
routes,
})

export default router;