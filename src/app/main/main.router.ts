import {Routes} from '@angular/router';
import { MainComponent } from './main.component';
export const mainRouter:Routes=[
{path:'',component:MainComponent,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadChildren:'./home/home.module#HomeModule'},
    {path:'function',loadChildren:'./funtion/funtion.module#FuntionModule'},
    {path:'post',loadChildren:'./post/post.module#PostModule'},
    {path:'post-add',loadChildren:'./post-add/post-add.module#PostAddModule'},
    {path:'role',loadChildren:'./role/role.module#RoleModule'},
    {path:'user',loadChildren:'./user/user.module#UserModule'},
    {path:'product',loadChildren:'./product/product.module#ProductModule'},
    {path:'productcategory',loadChildren:'./product-category/product-category.module#ProductCategoryModule'}, 
    {path:'slide',loadChildren:'./slide/slide.module#SlideModule'}, 
    {path:'contact',loadChildren:'./contact/contact.module#ContactModule'}, 
    {path:'page',loadChildren:'./page/page.module#PageModule'}, 
    {path:'pantner',loadChildren:'./logopantner/logopantner.module#LogopantnerModule'}, 
    {path:'tag',loadChildren:'./tag/tag.module#TagModule'}, 
    {path:'systemconfig',loadChildren:'./system-config/system-config.module#SystemConfigModule'}, 
    {path:'changepass',loadChildren:'./changepass/changepass.module#ChangepassModule'},
    
]},

]
