<?php

use App\Http\Controllers\admin\AdminController;
use App\Http\Controllers\admin\BlogController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\admin\ServiceCotroller;
use App\Http\Controllers\front\BlogController as FrontBlogController;
use App\Http\Controllers\front\ContactController;
use App\Http\Controllers\front\ProjectController as FrontProjectController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::post('login', [AuthController::class,'Login']);
Route::get('get-services', [FrontServiceController::class,'index']);
Route::get('get-latest-services', [FrontServiceController::class,'latestServices']);
Route::get('get-projects', [FrontProjectController::class,'allProjects']);
Route::get('get-latest-projects', [FrontProjectController::class,'latestProjects']);
Route::get('get-blogs', [FrontBlogController::class,'allBlogs']);
Route::get('get-latest-blogs', [FrontBlogController::class,'latestBlogs']);
Route::post('contact-now', [ContactController::class,'index']);

Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::post('admin', [AdminController::class,'admin']);
    Route::get('logout', [AuthController::class,'Logout']);
    Route::post('image', [TempImageController::class,'store']);

    Route::get('service', [ServiceCotroller::class,'index']);
    Route::post('service', [ServiceCotroller::class,'store']);
    Route::put('service/{id}', [ServiceCotroller::class,'update']);
    Route::get('service/{id}', [ServiceCotroller::class,'show']);
    Route::delete('service/{id}', [ServiceCotroller::class,'destroy']);

    Route::get('project', [ProjectController::class,'index']);
    Route::post('project', [ProjectController::class,'store']);
    Route::put('project/{id}', [ProjectController::class,'update']);
    Route::get('project/{id}', [ProjectController::class,'show']);
    Route::delete('project/{id}', [ProjectController::class,'destroy']);

    Route::get('blog', [BlogController::class,'index']);
    Route::post('blog', [BlogController::class,'store']);
    Route::put('blog/{id}', [BlogController::class,'update']);
    Route::get('blog/{id}', [BlogController::class,'show']);
    Route::delete('blog/{id}', [BlogController::class,'destroy']);

});
