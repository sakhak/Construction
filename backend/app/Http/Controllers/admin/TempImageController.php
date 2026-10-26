<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TempImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validator = Validator::make($request->all(), [
        'image' => 'required|mimes:png,jpg,jpeg,gif|max:2048',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'message' => $validator->errors(),
        ]);
    }

    $image = $request->file('image');
    $ext = $image->getClientOriginalExtension();
    $imageName = time() . '.' . $ext;

    $tempImage = new TempImage();
    $tempImage->name = $imageName;
    $tempImage->save();

    $uploadPath = public_path('Upload/temp');
    if (!file_exists($uploadPath)) {
        mkdir($uploadPath, 0777, true);
    }

    $image->move($uploadPath, $imageName);

    $sourcePath = $uploadPath . '/' . $imageName;
    $thumbPath = public_path('Upload/temp/thumb');
    if (!file_exists($thumbPath)) {
        mkdir($thumbPath, 0777, true);
    }
    $destPath = $thumbPath . '/' . $imageName;
    $manager = new ImageManager(new Driver());
    $img = $manager->read($sourcePath);
    $img->coverDown(300, 300);
    $img->save($destPath);

    return response()->json([
        'status' => true,
        'image' => $tempImage,
        'message' => 'Image uploaded successfully!',
    ]);
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
