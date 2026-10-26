<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::where('status',1)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status'=> true,
            'data'=> $services,
        ]);
    }
    public function latestServices(Request $request)
    {
        $limit = (int) $request->get('limit', 4);

        $services = Service::where('status',1)
                    ->take($limit)
                    ->orderBy('created_at', 'DESC')
                    ->get();
         return response()->json([
            'status'=> true,
            'data'=> $services,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
