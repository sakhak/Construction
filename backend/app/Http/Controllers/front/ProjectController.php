<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function latestProjects(Request $request)
    {
        $limit = (int) $request->get('limit', 4);

        $projects = Project::where('status', 1)
            ->orderBy('created_at', 'DESC')
            ->take($limit)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $projects,
        ]);
    }

    public function allProjects()
    {
        $projects = Project::where('status', 1)
            ->orderBy('created_at', 'DESC')
            ->get();

        return response()->json([
            'status' => true,
            'data' => $projects,
        ]);
    }
}
