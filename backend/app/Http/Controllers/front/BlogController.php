<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function allBlogs()
    {
        $blogs = Blog::where('status', 1)
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $blogs,
        ]);
    }

    public function latestBlogs(Request $request)
    {
        $limit = (int) $request->get('limit', 3);

        $blogs = Blog::where('status', 1)
            ->orderBy('created_at', 'DESC')
            ->take($limit)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $blogs,
        ]);
    }
}
