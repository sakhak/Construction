<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Project;
use App\Models\Service;

class AdminController extends Controller
{
    public function admin()
    {
        return response()->json([
            'status' => true,
            'summary' => [
                'services' => Service::count(),
                'active_services' => Service::where('status', 1)->count(),
                'projects' => Project::count(),
                'active_projects' => Project::where('status', 1)->count(),
                'blogs' => Blog::count(),
                'active_blogs' => Blog::where('status', 1)->count(),
            ],
            'recent' => [
                'services' => Service::orderBy('created_at', 'DESC')->take(5)->get(),
                'projects' => Project::orderBy('created_at', 'DESC')->take(5)->get(),
                'blogs' => Blog::orderBy('created_at', 'DESC')->take(5)->get(),
            ],
        ]);
    }
}
